package com.siesque.plantos

import android.util.Log
import okhttp3.*

class PlantOSWebSocketClient {

    private val TAG = "PlantOS_WS"

    private val client = OkHttpClient()

    private var webSocket: WebSocket? = null

    fun connect() {
        val request = Request.Builder()
            .url("ws://10.0.2.2:8080/v1/admin")
            .build()

        val listener = PlantOSWebSocketListener()

        webSocket = client.newWebSocket(request, listener)

        Log.d(TAG, "Connecting WebSocket...")
    }

    fun sendHello() {
        val messageType = 1

        val buffer = java.nio.ByteBuffer.allocate(4)
        buffer.order(java.nio.ByteOrder.LITTLE_ENDIAN)   // 👈 IMPORTANTE
        buffer.putInt(messageType)

        webSocket?.send(okio.ByteString.of(*buffer.array()))

        Log.d(TAG, "Sent binary Hello")
    }

    inner class PlantOSWebSocketListener : WebSocketListener() {

        override fun onOpen(webSocket: WebSocket, response: Response) {
            Log.d(TAG, "WebSocket Connected")

            // Cuando conecta enviamos Hello
            sendHello()
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            Log.d(TAG, "Received message: $text")
        }

        override fun onMessage(webSocket: WebSocket, bytes: okio.ByteString) {

            val byteArray = bytes.toByteArray()

            if (byteArray.size < 4) {
                Log.d(TAG, "Message too small")
                return
            }

            val buffer = java.nio.ByteBuffer.wrap(byteArray)
            buffer.order(java.nio.ByteOrder.LITTLE_ENDIAN)

            val messageType = buffer.int

            Log.d(TAG, "Received message type: $messageType")

            val payload = byteArray.copyOfRange(4, byteArray.size)

            Log.d(TAG, "Payload size: ${payload.size} bytes")
        }

        override fun onFailure(
            webSocket: WebSocket,
            t: Throwable,
            response: Response?
        ) {
            Log.e(TAG, "WebSocket Error", t)
        }
    }
}