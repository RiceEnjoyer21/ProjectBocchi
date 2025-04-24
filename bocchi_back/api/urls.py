from django.urls import path
from .views import (
    tickets_for_group,
    merch_for_group,
    UserTicketsView,
    UserMerchView,
)

urlpatterns = [
    path('groups/<int:group_id>/tickets/', tickets_for_group, name='group_tickets'),
    path('groups/<int:group_id>/merch/', merch_for_group, name='group_merch'),
    path('user/tickets/', UserTicketsView.as_view(), name='user_tickets'),
    path('user/merch/', UserMerchView.as_view(), name='user_merch'),
]
