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

// ----------------  doctor appointments table table --------------------------------------//



// ----------------  patients appointment table --------------------------------------//

$(document).ready(function() {
    var table = $('patient-table').DataTable( {
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'doctorName' },           
            { data: 'doctorContact' },
          
        ]
    } );
})
// ----------------  patients appointments table end --------------------------------------//



// ---------------- all patients table --------------------------------------//

// $(document).ready(function() {
//     var table = $('#allpat-table').DataTable( {
//         columns: [
//             { data: 'patientId' },
//             { data: 'patientName' },
//             { data: 'patientEmail' },
//             { data: 'patientContact' },           
//             { data: 'patientGendert' },
            
//             { data: 'action' }
//         ]
//     } );

//     // Handle click event on view button
//     $('#allpat-table tbody').on('click', '#prescButton', function () {
//         var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
       
//         $('#prescModalLabel').text(data.patientName); // Update modal title with appointment number
//         $('#modalPatientName').text(data.patientName); // Update patient name in modal
//         $('#modalPatientId').text(data.patientId)
//         $('#prescModal').modal('show'); // Show the modal
//     } );


//     // hiden id input
//     $('#prescModal').on('show.bs.modal', function(event) {
//         var button = $(event.relatedTarget);
//         var patientId = button.data('bs-patientid');
//         var modal = $(this);
//         modal.find('#modalPatientIdInput').val(patientId);
//         modal.find('#modalPatientName').text(button.closest('tr').find('td:eq(1)').text());
//       });
      
// });


$(document).ready(function() {
    var table = $('#allpat-table').DataTable( {
        columns: [
            { data: 'patientId' },
            { data: 'patientName' },
            { data: 'patientEmail' },
            { data: 'patientContact' },           
            { data: 'patientGendert' },
            
            { data: 'action' }
        ]
    } );

    // Handle click event on view button
    $('#allpat-table tbody').on('click', '#prescButton', function () {
        var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
       
        $('#prescModalLabel').text(data.patientName); // Update modal title with appointment number
        $('#modalPatientName').text(data.patientName); // Update patient name in modal
        $('#modalPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#prescModal').modal('show'); // Show the modal
    } );
});

// ---------------- all patients table end--------------------------------------//






