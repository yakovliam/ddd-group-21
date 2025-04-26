package ddd.group21.controller;

import ddd.group21.model.*;
import ddd.group21.model.dto.CartDTO;
import ddd.group21.model.dto.CustomerOrderDTO;
import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.model.mapper.ProductMapper;
import ddd.group21.repository.ProductRepository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.Set;

import jakarta.validation.Valid;
import org.slf4j.Logger;
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

    private final ProductMapper productMapper = ProductMapper.INSTANCE;

    private final ProductRepository productRepository;

    public ProductsController(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
    public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductDTO productDTO) {
        System.out.println(productDTO);
        Product newproduct = new Product(productDTO);
        newproduct.setCreationDate(new Timestamp(System.currentTimeMillis()));
        newproduct.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        productRepository.save(newproduct);

        return ResponseEntity.ok("Product added successfully");
    }

    @PostMapping("/{id}")
    public ResponseEntity<Object> modifyProduct(@Valid @PathVariable("id") String productid, @RequestBody ProductDTO productDTO) {
        Optional<Product> optionalProduct = productRepository.findById(Long.parseLong(productid));
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(400).body("Product " + productid + " does not exist");
        }
        System.out.println(productid);
System.out.println(productDTO);
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
