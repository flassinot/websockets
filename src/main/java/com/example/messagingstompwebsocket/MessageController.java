package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

	SimpMessagingTemplate simpMessagingTemplate;

	public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	@MessageMapping("/message")
	@SendToUser("/queue/reply")
	public void signalement(@Payload Message message, @Header("simpSessionId") String sessionId) {
		System.out.println("Message received : " + message);

		this.simpMessagingTemplate.convertAndSend("/topic/messages",
				new Message(message.getText()));
	}
}
