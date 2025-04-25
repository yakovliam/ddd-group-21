package ddd.group21.model.dto;

import java.util.Set;

public class CartDTO {

  private final Set<CartItemDTO> cartItemDTOS;

  public CartDTO(Set<CartItemDTO> cartItemDTOS) {
    this.cartItemDTOS = cartItemDTOS;
  }

  public Set<CartItemDTO> getCartItems() {
    return cartItemDTOS;
  }
}
