package ddd.group21.controller;

import ddd.group21.model.Product;
import ddd.group21.repository.ProductsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
@RequestMapping("/products")
public class ProductsController {

  private final ProductsRepository productsRepository;

  public ProductsController(ProductsRepository productsRepository) {
    this.productsRepository = productsRepository;
  }

  @GetMapping
  public ResponseEntity<Page<Product>> getProducts(Pageable pageable) {
    return ResponseEntity.ok(productsRepository.findAll(pageable));
  }
}
