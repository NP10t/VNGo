import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { getAppContext } from '@/view-model/context';

export default function ChatScreen() {
  const { messages, setMessages } = getAppContext(); // Retrieve messages and setMessages from context
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMessageObj = {
      id: `${messages.length + 1}`,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      title: "New Message", // Add title property
      content: newMessage, // Add content property
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const renderMessage = ({ item }: { item: { id: string; sender: string; text: string; time: string } }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.driverMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Ảnh giả lập
          style={styles.driverAvatar}
        />
        <View>
          <Text style={styles.headerTitle}>Phạm Hữu Quý</Text>
          <Text style={styles.headerSubtitle}>Driver</Text>
        </View>
      </View>

      {/* Tin nhắn */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      {/* Nhập tin nhắn */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callIcon}>📞</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Nhắn tin với Driver của bạn..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7ff",
  },
  driverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  callButton: {
    marginRight: 10,
  },
  callIcon: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
