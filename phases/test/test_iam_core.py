from django.test import TestCase
from django.contrib.auth import get_user_model

class UserAuthenticationTests(TestCase):
    def test_user_creation_as_staff(self):
        # ایجاد یک کاربر جدید با استاتوس staff
        User = get_user_model()
        user = User.objects.create_user(
            username='testuser',
            password='testpassword123',
            is_staff=True
        )
        # چک کردن اینکه آیا کاربر به درستی به عنوان staff ایجاد شده است
        self.assertTrue(user.is_staff)

    def test_user_authentication(self):
        # این تابع تست می‌کند که آیا کاربر می‌تواند با استفاده از gRPC احراز هویت شود
        # در اینجا باید تابع gRPC client را فراخوانی کنید
        status = send_user_info("Test", "User", "1234567890", "test@example.com", True, False)
        self.assertEqual(status, "Success")
