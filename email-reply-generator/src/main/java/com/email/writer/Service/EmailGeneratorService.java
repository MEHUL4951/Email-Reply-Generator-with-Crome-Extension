package com.email.writer.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.email.writer.controller.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Value("${gemini.api.url}")
    private String gemini_api_url;

    @Value("${gemini.api.key}")
    private String gemini_api_key;

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);

     
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        try {
            // ✅ Proper POST request
            String response = webClient.post()
                    .uri(gemini_api_url + gemini_api_key)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponseContent(response);

        } catch (WebClientResponseException e) {
            return "API Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            return "Error calling Gemini API: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        String tone = emailRequest.getTone();
        String emailContent = emailRequest.getEmailContent();

        prompt.append("You are an expert email communication assistant.\n")
        .append("Your task is to write only the email body (without any subject line) in a professional and natural way based on the specified tone.\n\n")
        .append("Instructions:\n")
        .append("- Read the original email carefully and understand its intent.\n")
        .append("- Write a complete reply email body that sounds natural and context-aware.\n")
        .append("- Do NOT include any subject line.\n")
        .append("- Start with an appropriate greeting (e.g., 'Hi John,') and end with a polite closing (e.g., 'Best regards,').\n")
        .append("- Follow the specified tone exactly.\n")
        .append("- If the sender asks questions, answer them.\n")
        .append("- If the sender makes a request, respond accordingly.\n")
        .append("- Keep it concise but meaningful (around 100–150 words).\n\n")
        .append("Tone: ").append(tone).append("\n\n")
        .append("Original Email:\n")
        .append(emailContent).append("\n\n")
        .append("Now, write only the email body (no subject line):");


        return prompt.toString();
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            // ✅ Gemini response structure
            return root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage();
        }
    }
}


