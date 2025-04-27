package ddd.group21.controller;

import ddd.group21.model.*;
import ddd.group21.model.dto.CartDTO;
import ddd.group21.model.dto.CustomerOrderDTO;
import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.dto.newProductDTO;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.model.mapper.ProductMapper;
import ddd.group21.model.mapper.StockMapper;
import ddd.group21.repository.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.Set;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/products")
public class ProductsController {

    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(ProductsController.class);
    private final WarehouseRepository warehouseRepository;
    private final SupplierRepository supplierRepository;
    private final SupplierProductRepository supplierProductRepository;
    private final ProductMapper productMapper = ProductMapper.INSTANCE;
    private final StockMapper stockMapper = StockMapper.INSTANCE;
    private final StockRepository stockRepository;
    private final ProductRepository productRepository;

    public ProductsController(WarehouseRepository warehouseRepository,SupplierProductRepository supplierProductRepository, SupplierRepository supplierRepository, ProductRepository productRepository, StockRepository stockRepository) {
        this.warehouseRepository = warehouseRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.stockRepository = stockRepository;
        this.supplierProductRepository = supplierProductRepository;
    }
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(Pageable pageable,
                                                        @RequestParam(name = "name", required = false)
                                                        String name) {
        if (name != null && !name.isEmpty()) {
            return ResponseEntity.ok(productRepository.findByNameStartsWith(name, pageable).map(
                    product -> productMapper.productToProductDTO(product,
                            new CycleAvoidingMappingContext())));
        }

        return ResponseEntity.ok(productRepository.findAll(pageable).map(
                product -> productMapper.productToProductDTO(product, new CycleAvoidingMappingContext())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductDTO>> getProduct(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productRepository.findById(id).map(
                product -> productMapper.productToProductDTO(product, new CycleAvoidingMappingContext())));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> addProduct(@Valid @RequestBody newProductDTO productDTO) {
        Stock stock = StockMapper.INSTANCE.newProductDTOToStock(productDTO, new CycleAvoidingMappingContext());
        stockRepository.save(stock);

        Warehouse warehouse = warehouseRepository.getReferenceById(Long.parseLong(productDTO.getWarehouseid()));
        warehouse.setQuantity(warehouse.getQuantity() - stock.getQuantity());
        warehouseRepository.save(warehouse);

        SupplierProduct supplierProduct = new SupplierProduct();
        supplierProduct.setSupplier(supplierRepository.getReferenceById(Long.parseLong(productDTO.getSupplierid())));
        supplierProduct.setProduct(ProductMapper.INSTANCE.newProductDTOToProduct(productDTO, new CycleAvoidingMappingContext()));
        supplierProduct.setPrice(productDTO.getSupplierprice());
        supplierProduct.setMinimumOrderQuantity(1);
        supplierProduct.setLeadTimeDays(3);
        supplierProductRepository.save(supplierProduct);

        Product newproduct = ProductMapper.INSTANCE.newProductDTOToProduct(productDTO, new CycleAvoidingMappingContext());
        newproduct.setCreationDate(new Timestamp(System.currentTimeMillis()));
        newproduct.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        productRepository.save(newproduct);

        return ResponseEntity.ok("Product added successfully");
    }

    @PostMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> modifyProduct(@Valid @PathVariable("id") String productid, @RequestBody newProductDTO productDTO) {
        Optional<Product> optionalProduct = productRepository.findById(Long.parseLong(productid));
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(400).body("Product " + productid + " does not exist");
        }
        Product existingProduct = optionalProduct.get();

        // Update the fields
        existingProduct.setName(productDTO.getName());
        existingProduct.setBrand(productDTO.getBrand());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setSize(productDTO.getSize());
        existingProduct.setWeight(productDTO.getWeight());
        existingProduct.setCurrentPrice(productDTO.getCurrentPrice());
        existingProduct.setImageUrl(productDTO.getImageUrl());
        existingProduct.setProductType(productDTO.getProductType());
        existingProduct.setLastUpdated(new Timestamp(System.currentTimeMillis()));

        // Save the updated product
        productRepository.save(existingProduct);

        return ResponseEntity.ok("Product updated successfully");
    }
}
