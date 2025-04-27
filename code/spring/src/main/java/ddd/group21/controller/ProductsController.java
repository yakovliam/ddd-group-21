package ddd.group21.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ddd.group21.model.Product;
import ddd.group21.model.ProductCategory;
import ddd.group21.model.dto.CreateProductDTO;
import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.model.mapper.ProductMapper;
import ddd.group21.repository.ProductCategoryRepository;
import ddd.group21.repository.ProductRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin
@RequestMapping("/products")
public class ProductsController {

  private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(ProductsController.class);

  private final ProductMapper productMapper = ProductMapper.INSTANCE;

  private final ProductRepository productRepository;
  private final ProductCategoryRepository productCategoryRepository;

  public ProductsController(ProductRepository productRepository,
                            ProductCategoryRepository productCategoryRepository) {
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
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
  public ResponseEntity<Object> createProduct(@RequestBody CreateProductDTO createProductDTO) {
    Long categoryId = createProductDTO.getCategoryId();

    ProductCategory productCategory = productCategoryRepository.findById(categoryId).orElse(null);

    if (productCategory == null) {
      return ResponseEntity.status(404)
          .body("Product category with id " + categoryId + " does not exist");
    }

    Product product = new Product();
    product.setProductType(createProductDTO.getProductType());
    product.setCategory(productCategory);
    product.setName(createProductDTO.getName());
    product.setBrand(createProductDTO.getBrand());
    product.setDescription(createProductDTO.getDescription());
    product.setSize(createProductDTO.getSize());
    product.setWeight(createProductDTO.getWeight());
    product.setCurrentPrice(createProductDTO.getCurrentPrice());
    product.setImageUrl(createProductDTO.getImageUrl());
    product.setCreationDate(new java.sql.Timestamp(System.currentTimeMillis()));
    product.setLastUpdated(new java.sql.Timestamp(System.currentTimeMillis()));

    productRepository.saveAndFlush(product);

    return ResponseEntity.ok(
        productMapper.productToProductDTO(product, new CycleAvoidingMappingContext()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
    if (!productRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Product with id " + id + " does not exist");
    }

    productRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
