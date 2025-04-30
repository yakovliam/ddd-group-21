package ddd.group21.controller.staff;

import ddd.group21.model.Address;
import ddd.group21.model.CreditCard;
import ddd.group21.model.Customer;
import ddd.group21.model.CustomerOrder;
import ddd.group21.model.Product;
import ddd.group21.model.ProductCategory;
import ddd.group21.model.Stock;
import ddd.group21.model.Supplier;
import ddd.group21.model.SupplierProduct;
import ddd.group21.model.Warehouse;
import ddd.group21.model.dto.CreateProductDTO;
import ddd.group21.model.dto.CustomerOrderDTO;
import ddd.group21.model.dto.StockDTO;
import ddd.group21.model.dto.SupplierDTO;
import ddd.group21.model.dto.SupplierProductDTO;
import ddd.group21.model.dto.WarehouseDTO;
import ddd.group21.model.mapper.CustomerOrderMapper;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.model.mapper.ProductMapper;
import ddd.group21.model.mapper.StockMapper;
import ddd.group21.model.mapper.SupplierMapper;
import ddd.group21.model.mapper.SupplierProductMapper;
import ddd.group21.model.mapper.WarehouseMapper;
import ddd.group21.repository.AddressRepository;
import ddd.group21.repository.CreditCardRepository;
import ddd.group21.repository.CustomerOrdersRepository;
import ddd.group21.repository.CustomerRepository;
import ddd.group21.repository.ProductCategoryRepository;
import ddd.group21.repository.ProductRepository;
import ddd.group21.repository.StockRepository;
import ddd.group21.repository.SupplierProductRepository;
import ddd.group21.repository.SupplierRepository;
import ddd.group21.repository.WarehouseRepository;
import java.sql.Timestamp;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
@RequestMapping("/staff/logistics")
public class StaffLogisticsController {

  private static final Logger LOGGER =
      org.slf4j.LoggerFactory.getLogger(StaffLogisticsController.class);

  private final SupplierMapper supplierMapper = SupplierMapper.INSTANCE;
  private final StockMapper stockMapper = StockMapper.INSTANCE;
  private final SupplierProductMapper supplierProductMapper = SupplierProductMapper.INSTANCE;
  private final WarehouseMapper warehouseMapper = WarehouseMapper.INSTANCE;
  private final ProductMapper productMapper = ProductMapper.INSTANCE;
  private final CustomerOrderMapper customerOrderMapper = CustomerOrderMapper.INSTANCE;

  private final SupplierRepository supplierRepository;
  private final SupplierProductRepository supplierProductRepository;
  private final WarehouseRepository warehouseRepository;
  private final StockRepository stockRepository;
  private final AddressRepository addressRepository;
  private final ProductRepository productRepository;
  private final ProductCategoryRepository productCategoryRepository;
  private final CustomerOrdersRepository customerOrdersRepository;
  private final CustomerRepository customerRepository;
  private final CreditCardRepository creditCardRepository;

  public StaffLogisticsController(SupplierRepository supplierRepository,
                                  SupplierProductRepository supplierProductRepository,
                                  WarehouseRepository warehouseRepository,
                                  StockRepository stockRepository,
                                  AddressRepository addressRepository,
                                  ProductRepository productRepository,
                                  ProductCategoryRepository productCategoryRepository,
                                  CustomerOrdersRepository customerOrdersRepository,
                                  CustomerRepository customerRepository,
                                  CreditCardRepository creditCardRepository) {
    this.supplierRepository = supplierRepository;
    this.supplierProductRepository = supplierProductRepository;
    this.warehouseRepository = warehouseRepository;
    this.stockRepository = stockRepository;
    this.addressRepository = addressRepository;
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.customerOrdersRepository = customerOrdersRepository;
    this.customerRepository = customerRepository;
    this.creditCardRepository = creditCardRepository;
  }

  @GetMapping("/products")
  public ResponseEntity<Object> getProducts() {
    return ResponseEntity.ok(productRepository.findAll().stream().map(
            product -> productMapper.productToProductDTO(product, new CycleAvoidingMappingContext()))
        .collect(Collectors.toSet()));
  }

  @PostMapping("/products")
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

  @DeleteMapping("/products/{id}")
  public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
    if (!productRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Product with id " + id + " does not exist");
    }

    productRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/suppliers")
  public ResponseEntity<Object> getSuppliers() {
    return ResponseEntity.ok(supplierRepository.findAll().stream().map(
        supplier -> supplierMapper.supplierToSupplierDTO(supplier,
            new CycleAvoidingMappingContext())).collect(Collectors.toSet()));
  }

  @DeleteMapping("/suppliers/{id}")
  public ResponseEntity<Object> deleteSupplier(@PathVariable Long id) {
    if (supplierRepository.existsById(id)) {
      supplierRepository.deleteById(id);
      return ResponseEntity.ok("Supplier deleted successfully");
    } else {
      return ResponseEntity.status(404).body("Supplier not found");
    }
  }

  @PostMapping("/suppliers/{id}")
  public ResponseEntity<Object> updateSupplier(@PathVariable Long id,
                                               @RequestBody SupplierDTO supplierDTO) {
    if (!supplierRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Supplier not found");
    }

    Long addressId = supplierDTO.getAddressId();
    Address address = addressRepository.findById(addressId).orElse(null);

    if (address == null) {
      return ResponseEntity.status(404).body("Address not found");
    }

    Supplier supplier = supplierMapper.supplierDTOToSupplier(supplierDTO, address,
        new CycleAvoidingMappingContext());
    supplier.setId(id);
    supplierRepository.saveAndFlush(supplier);

    return ResponseEntity.ok("Supplier updated successfully");
  }

  @GetMapping("/supplier-products")
  public ResponseEntity<Object> getSupplierProducts() {
    return ResponseEntity.ok(supplierProductRepository.findAll().stream().map(
        s -> supplierProductMapper.supplierProductToSupplierProductDTO(s,
            new CycleAvoidingMappingContext())).collect(Collectors.toSet()));
  }

  @DeleteMapping("/supplier-products/{id}")
  public ResponseEntity<Object> deleteSupplierProduct(@PathVariable Long id) {
    if (supplierProductRepository.existsById(id)) {
      supplierProductRepository.deleteById(id);
      return ResponseEntity.ok("Supplier product deleted successfully");
    } else {
      return ResponseEntity.status(404).body("Supplier product not found");
    }
  }

  @PostMapping("/supplier-products/{id}")
  public ResponseEntity<Object> updateSupplierProduct(@PathVariable Long id, @RequestBody
  SupplierProductDTO supplierProductDTO) {
    if (!supplierProductRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Supplier product not found");
    }

    Supplier supplier =
        supplierRepository.findById(supplierProductDTO.getSupplierId()).orElse(null);

    if (supplier == null) {
      return ResponseEntity.status(404).body("Supplier not found");
    }

    Product product = productRepository.findById(supplierProductDTO.getProductId()).orElse(null);

    if (product == null) {
      return ResponseEntity.status(404).body("Product not found");
    }

    SupplierProduct supplierProduct =
        supplierProductMapper.supplierProductDTOToSupplierProduct(supplierProductDTO, supplier,
            product, new CycleAvoidingMappingContext());
    supplierProduct.setId(id);
    supplierProductRepository.saveAndFlush(supplierProduct);

    return ResponseEntity.ok("Supplier product updated successfully");
  }

  @GetMapping("/stocks")
  public ResponseEntity<Object> getStocks() {
    return ResponseEntity.ok(stockRepository.findAll().stream()
        .map(s -> stockMapper.stockToStockDTO(s, new CycleAvoidingMappingContext()))
        .collect(Collectors.toSet()));
  }

  @DeleteMapping("/stocks/{id}")
  public ResponseEntity<Object> deleteStock(@PathVariable Long id) {
    if (stockRepository.existsById(id)) {
      stockRepository.deleteById(id);
      return ResponseEntity.ok("Stock deleted successfully");
    } else {
      return ResponseEntity.status(404).body("Stock not found");
    }
  }

  @PostMapping("/stocks/{id}")
  public ResponseEntity<Object> updateStock(@PathVariable Long id, @RequestBody StockDTO stockDTO) {
    if (!stockRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Stock not found");
    }

    Product product = productRepository.findById(stockDTO.getProductId()).orElse(null);

    if (product == null) {
      return ResponseEntity.status(404).body("Product not found");
    }

    Warehouse warehouse = warehouseRepository.findById(stockDTO.getWarehouseId()).orElse(null);

    if (warehouse == null) {
      return ResponseEntity.status(404).body("Warehouse not found");
    }

    Stock stock = stockMapper.stockDTOToStock(stockDTO, product, warehouse,
        new Timestamp(System.currentTimeMillis()), new CycleAvoidingMappingContext());
    stock.setId(id);
    stockRepository.saveAndFlush(stock);

    return ResponseEntity.ok("Stock updated successfully");
  }


  @GetMapping("/warehouses")
  public ResponseEntity<Object> getWarehouses() {
    return ResponseEntity.ok(warehouseRepository.findAll().stream().map(
        warehouse -> warehouseMapper.warehouseToWarehouseDTO(warehouse,
            new CycleAvoidingMappingContext())).collect(Collectors.toSet()));
  }

  @DeleteMapping("/warehouses/{id}")
  public ResponseEntity<Object> deleteWarehouse(@PathVariable Long id) {
    if (warehouseRepository.existsById(id)) {
      warehouseRepository.deleteById(id);
      return ResponseEntity.ok("Warehouse deleted successfully");
    } else {
      return ResponseEntity.status(404).body("Warehouse not found");
    }
  }

  @PostMapping("/warehouses/{id}")
  public ResponseEntity<Object> updateWarehouse(@PathVariable Long id,
                                                @RequestBody WarehouseDTO warehouseDTO) {
    if (!warehouseRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Warehouse not found");
    }

    Address address = addressRepository.findById(warehouseDTO.getAddressId()).orElse(null);

    if (address == null) {
      return ResponseEntity.status(404).body("Address not found");
    }

    Warehouse warehouse = warehouseMapper.warehouseDTOToWarehouse(warehouseDTO, address,
        new CycleAvoidingMappingContext());
    warehouse.setId(id);
    warehouseRepository.saveAndFlush(warehouse);

    return ResponseEntity.ok("Warehouse updated successfully");
  }

  @GetMapping("/customer-orders")
  public ResponseEntity<Object> getOrders() {
    return ResponseEntity.ok(customerOrdersRepository.findAll().stream().map(
        order -> customerOrderMapper.customerOrderToCustomerOrderDTO(order,
            new CycleAvoidingMappingContext())).collect(Collectors.toSet()));
  }

  @PostMapping("/customer-orders/{id}")
  public ResponseEntity<Object> updateOrder(@PathVariable Long id,
                                            @RequestBody CustomerOrderDTO customerOrderDTO) {
    if (!customerOrdersRepository.existsById(id)) {
      return ResponseEntity.status(404).body("Order not found");
    }

    Customer customer = customerRepository.findById(customerOrderDTO.getCustomerId()).orElse(null);

    if (customer == null) {
      return ResponseEntity.status(404).body("Customer not found");
    }

    CreditCard creditCard =
        creditCardRepository.findByCustomerAndDefault(customer, true).orElse(null);

    if (creditCard == null) {
      return ResponseEntity.status(404).body("Credit card not found");
    }

    CustomerOrder order =
        customerOrderMapper.customerOrderDTOToCustomerOrder(customerOrderDTO, customer,
            creditCard, new CycleAvoidingMappingContext());
    order.setId(id);
    customerOrdersRepository.saveAndFlush(order);

    return ResponseEntity.ok("Order updated successfully");
  }
}