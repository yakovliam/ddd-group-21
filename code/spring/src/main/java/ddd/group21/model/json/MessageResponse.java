package ddd.group21.model.json;

public class MessageResponse {

  private final String message;

  public MessageResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public static MessageResponse of(String message) {
    return new MessageResponse(message);
  }
}
