from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Ticket, Merch
from .serializers import TicketSerializer, MerchSerializer



# ---------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def tickets_for_group(request, group_id):
    tickets = Ticket.objects.filter(group_id=group_id)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def merch_for_group(request, group_id):
    merch = Merch.objects.filter(group_id=group_id)
    serializer = MerchSerializer(merch, many=True)
    return Response(serializer.data)


class UserTicketsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = Ticket.objects.filter(user=request.user)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)



class UserMerchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        merch = Merch.objects.filter(user=request.user)
        serializer = MerchSerializer(merch, many=True)
        return Response(serializer.data)
