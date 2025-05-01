package ddd.group21.model.dto;

import java.math.BigDecimal;

public class CustomerInfoDTO {
    private Long id;
    private String userAccountId;
    private String firstName;
    private String lastName;
    private BigDecimal accountBalance;

    public CustomerInfoDTO(Long id, String userAccountId, String firstName, String lastName, BigDecimal accountBalance) {
        this.id = id;
        this.userAccountId = userAccountId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountBalance = accountBalance;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUserAccountId() {
        return userAccountId;
    }
    public void setUserAccountId(String userAccountId) {
        this.userAccountId = userAccountId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public BigDecimal getAccountBalance() {
        return accountBalance;
    }
    public void setAccountBalance(BigDecimal accountBalance) {
        this.accountBalance = accountBalance;
    }
}
