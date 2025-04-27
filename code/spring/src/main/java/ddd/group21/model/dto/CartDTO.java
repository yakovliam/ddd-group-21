package ddd.group21.model.dto;

import java.util.Set;

public class CartDTO {

  private final Set<CartItemDTO> cartItems;

  public CartDTO(Set<CartItemDTO> cartItems) {
    this.cartItems = cartItems;
  }

  public Set<CartItemDTO> getCartItems() {
    return cartItems;
  }
}
