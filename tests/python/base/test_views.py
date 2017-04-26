from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class BaseTests(APITestCase):

    def test_get_main_page(self):

        response = self.client.get(reverse('index'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
