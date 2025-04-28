package ddd.group21.controller;

import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.model.mapper.ProductMapper;
import ddd.group21.repository.ProductRepository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin
@RequestMapping("/products")
public class ProductsController {

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
}
