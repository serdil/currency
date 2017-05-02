import os

import redis

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())


class ChartConfigView(APIView):

    def get(self, request):
        r = redis.StrictRedis(host='redis', port=6379, db=0, decode_responses=True)
        config = r.lrange('chartconfig', 0, -1)
        data = self.transform_config_to_client_format(config)
        return Response(data, status=status.HTTP_200_OK)

    @staticmethod
    def transform_config_to_client_format(config):
        return [
            {
                'currencyPair': pair.split(':')[0],
                'pollingInterval': int(pair.split(':')[1])
            } for pair in config
            ]

    def put(self, request):
        r = redis.StrictRedis(host='redis', port=6379, db=0)
        if not self.validate_request_data(request.data):
            return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)
        pairs = self.transform_client_data_to_redis_format(request.data)
        self.save_new_chart_config(r, pairs)
        return Response({'success': True}, status=status.HTTP_200_OK)

    @staticmethod
    def validate_request_data(data):
        if not isinstance(data, list): return False
        try:
            for item in data:
                if not isinstance(item, dict) \
                        or not isinstance(item['currencyPair'], str) \
                        or not isinstance(item['pollingInterval'], int):
                    return False
            return True
        except KeyError:
            return False

    @staticmethod
    def transform_client_data_to_redis_format(data):
        return [
            config['currencyPair'] + ':' + str(config['pollingInterval'])
            for config in data
            ]

    @staticmethod
    def save_new_chart_config(redis_instance, pairs):
        pipeline = redis_instance.pipeline()  # Execute a transaction to avoid race conditions
        pipeline.delete('chartconfig')
        if pairs:
            pipeline.rpush('chartconfig', *pairs)
        pipeline.execute()
