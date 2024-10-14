from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
@login_required
def video_call_view(request, member_id):
    # Read the 'initiator' parameter from the URL
    is_initiator = request.GET.get('initiator') == 'true'
    return render(request, 'appel/video_call.html', {
        'member_id': member_id,
        'is_initiator': is_initiator
    })
