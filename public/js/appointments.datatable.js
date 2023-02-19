$(document).ready(function() {
    var table = $('#appointment-table').DataTable( {
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'patientName' },           
            { data: 'patientContact' },
            { data: 'view' }
        ]
    } );

    // Handle click event on view button
    $('#appointment-table tbody').on('click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
        $("#modalAppointmentNumber").text(data.appointmentNumber);
        $("#modalAppointmentDate").text(data.appointmentDate);
        $("#modalAppointmentTime").text(data.appointmentTime);
        $('#exampleModalLabel').text(data.patientName); // Update modal title with appointment number
        $('#modalPatientName').text(data.patientName); // Update patient name in modal
        $('#modalPatientEmail').text(data.patientEmail); // Update patient email in modal
        $('#modalPatientContact').text(data.patientContact); // Update patient contact in modal
        $('#modalDoctorName').text(data.doctorName); // Update doctor name in modal
        $('#exampleModal').modal('show'); // Show the modal
    } );
});


$(document).ready(function() {
    var table = $('#patient-table').DataTable( {
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'doctorName' },           
            { data: 'doctorContact' },
          
        ]
    } );
})

  









