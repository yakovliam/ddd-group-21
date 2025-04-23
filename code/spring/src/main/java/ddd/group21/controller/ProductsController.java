package ddd.group21.controller;

import ddd.group21.model.Product;
import ddd.group21.repository.ProductsRepository;
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

  private final ProductsRepository productsRepository;

  public ProductsController(ProductsRepository productsRepository) {
    this.productsRepository = productsRepository;
  }

  @GetMapping
  public ResponseEntity<Page<Product>> getProducts(Pageable pageable,
                                                   @RequestParam("name") String name) {
    if (name != null && !name.isEmpty()) {
      return ResponseEntity.ok(productsRepository.findByNameStartsWith(name, pageable));
    }

    return ResponseEntity.ok(productsRepository.findAll(pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getProduct(@PathVariable("id") Long id) {
    return ResponseEntity.ok(productsRepository.findById(id));
  }
}
