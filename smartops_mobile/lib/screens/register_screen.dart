import 'package:flutter/material.dart';
import 'package:smartops_mobile/api/api_error.dart';
import 'package:smartops_mobile/api/error_message.dart';
import 'package:smartops_mobile/models/user_model.dart';
import 'package:smartops_mobile/services/user_service.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  late final TextEditingController _usernameController;
  late final TextEditingController _passwordController;
  late final TextEditingController _emailController;

  bool _isLoading = false;
  String? _formError;
  Map<String, String> _fieldErrors = {};

  final UserService _userService = UserService();

  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController();
    _passwordController = TextEditingController();
    _emailController = TextEditingController();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _handleRegister() async {
    setState(() {
      _fieldErrors;
      _formError = null;
      _isLoading = true;
    });

    try {
      await _userService.registerUser(
        User(
          username: _usernameController.text.trim(),
          password: _passwordController.text,
          email: _emailController.text.trim(),
        ),
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('สมัครสมาชิกสำเร็จ!'),
          backgroundColor: Colors.green,
        ),
      );
    } on ApiError catch (e) {
      if (!mounted) return;
      setState(() {
        switch (e.code) {
          case 'USERNAME_TAKEN':
            _fieldErrors = {'username': messageFor(e.code)};
            break;
          case 'EMAIL_TAKEN':
            _fieldErrors = {'email': messageFor(e.code)};
            break;
          case 'VALIDATION_FAILED':
            _fieldErrors = e.fieldErrors; // {email: "...", password: "..."}
            break;
          default:
            _formError = messageFor(e.code);
        }
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("SmartOps - Register")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                labelText: 'Username',
                errorText: _fieldErrors["username"],
              ),
            ),
            SizedBox(height: 12),

            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                errorText: _fieldErrors["email"],
              ),
            ),
            SizedBox(height: 12),

            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
                errorText: _fieldErrors["password"],
              ),
            ),
            SizedBox(height: 24),

            if (_formError != null) ...[
              Text(
                _formError!,
                style: TextStyle(color: Theme.of(context).colorScheme.error),
              ),
              SizedBox(height: 12),
            ],

            _isLoading
                ? CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _handleRegister,
                    child: Text("Register"),
                  ),
          ],
        ),
      ),
    );
  }
}
