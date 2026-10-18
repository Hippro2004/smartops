import 'package:flutter/material.dart';
import 'package:smartops_mobile/screens/register_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    AppBarTheme(backgroundColor: Colors.blue);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SmartOps Mobile',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("SmartOps Home")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RegisterScreen()),
                );
              },
              child: Text("ไปหน้าสมัครสมาชิก"),
            ),

            SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
