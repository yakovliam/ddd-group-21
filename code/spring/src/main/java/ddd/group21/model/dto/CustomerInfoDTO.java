package ddd.group21.model.dto;

import java.math.BigDecimal;

public class CustomerInfoDTO {
    private Long customer_id;
    private String user_id;
    private String first_name;
    private String last_name;
    private BigDecimal account_balance;

    public CustomerInfoDTO(Long customer_id, String user_id, String first_name, String last_name, BigDecimal account_balance) {
      this.customer_id = customer_id;
      this.user_id = user_id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.account_balance = account_balance;

    }
    public Long getCustomer_id() {
        return customer_id;
    }
    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }
    public String getUser_id() {
        return user_id;
    }
    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public BigDecimal getAccount_balance() {
        return account_balance;
    }
    public void setAccount_balance(BigDecimal account_balance) {
        this.account_balance = account_balance;
    }
}
