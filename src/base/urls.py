from django.conf.urls import url

from base import views as base_views

urlpatterns = [
    url(r'chartconfig/',
        base_views.ChartConfigView.as_view(),
        name='chart_config'),
]
