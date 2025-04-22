package ddd.group21;

import ddd.group21.model.UserAccount;
import ddd.group21.repository.UserAccountRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

  private final UserAccountRepository userAccountRepository;

  public Application(UserAccountRepository userAccountRepository) {
    this.userAccountRepository = userAccountRepository;
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @PostConstruct
  public void init() {
    UserAccount test = new UserAccount();
    test.setKeycloakId("test");

    userAccountRepository.saveAndFlush(test);
  }
}
