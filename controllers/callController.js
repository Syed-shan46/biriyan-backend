const admin = require('firebase-admin');

exports.triggerIncomingCall = async (req, res) => {
  const registrationTokens = ['YOUR_FCM_TOKEN_1', 'YOUR_FCM_TOKEN_2']; // Replace with actual tokens
  const payload = {
    notification: {
      title: 'Incoming Call',
      body: 'You have an incoming call',
    },
    data: {
      type: 'incoming_call',
      callerName: 'Someone',
      callerAvatar: 'https://example.com/default-avatar.png',
      callType: 'audio',
      timestamp: Date.now().toString(),
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens: registrationTokens,
      notification: payload.notification,
      data: payload.data,
    });

    // Check the responses to find any errors
    const failedResponses = response.responses.filter(r => !r.success);
    if (failedResponses.length > 0) {
      console.error('FCM Error Responses:', failedResponses);
      res.status(500).send({ success: false, error: 'Failed to send FCM message.' });
    } else {
      console.log('Messages sent successfully:', response);
      res.status(200).send({ success: true, message: 'Call triggered successfully.' });
    }
  } catch (error) {
    console.error('Error sending FCM message:', error);
    res.status(500).send({ success: false, error: 'Failed to send FCM message.' });
  }
};
