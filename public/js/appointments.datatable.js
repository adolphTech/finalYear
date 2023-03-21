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
    $('#appointment-table tbody').on('click', '#viewButton', function () {
        var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
        console.log(data)
        $('#viewModalLabel').text(data.patientName); // Update modal title with appointment number

        $("#viewAppointmentNumber").text(data.appointmentNumber);
        $("#viewAppointmentDate").text(data.appointmentDate);
        $("#viewAppointmentTime").text(data.appointmentTime);

        $('#viewPatientName').text(data.patientName); // Update patient name in modal
        $('#viewPatientEmail').text(data.patientEmail); // Update patient email in modal
        $('#viewPatientContact').text(data.patientContact); // Update patient contact in modal

        // $('#viewDoctorName').text(data.doctorName); // Update doctor name in modal
        $('#viewModal').modal('show'); // Show the modal
    } );
});

// ----------------  doctor appointments table table --------------------------------------//



// ----------------  patients appointment table --------------------------------------//

// $(document).ready(function() {
//     var table = $('patient-table').DataTable( {
//         columns: [
//             { data: 'appointmentNumber' },
//             { data: 'appointmentDate' },
//             { data: 'appointmentTime' },
//             { data: 'doctorName' },           
//             { data: 'doctorContact' },
          
//         ]
//     } );
// })

$(document).ready(function() {
    var table = $('#patient-table').DataTable( {
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'doctorName' },           
            { data: 'doctorContact' }
        ]
    } );

    // // Handle click event on view button
    // $('#appointment-table tbody').on('click', '#viewButton', function () {
    //     var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
    //     console.log(data)
    //     $('#viewModalLabel').text(data.patientName); // Update modal title with appointment number

    //     $("#viewAppointmentNumber").text(data.appointmentNumber);
    //     $("#viewAppointmentDate").text(data.appointmentDate);
    //     $("#viewAppointmentTime").text(data.appointmentTime);

    //     $('#viewPatientName').text(data.patientName); // Update patient name in modal
    //     $('#viewPatientEmail').text(data.patientEmail); // Update patient email in modal
    //     $('#viewPatientContact').text(data.patientContact); // Update patient contact in modal

    //     // $('#viewDoctorName').text(data.doctorName); // Update doctor name in modal
    //     $('#viewModal').modal('show'); // Show the modal
    // } );
});


// ----------------  patients appointments table end --------------------------------------//



// ---------------- all patients table --------------------------------------//



$(document).ready(function() {
    var table = $('#allpat-table').DataTable( {
        columns: [
            { data: 'patientId' },
            { data: 'patientName' },
            { data: 'patientEmail' },
            { data: 'patientContact' },           
            { data: 'patientGender' },
            
            { data: 'action' }
        ]
    } );

    $('#allpat-table tbody').on('click', '#appButton', function () {
        var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
        console.log(data)

                // Set the value of the hidden input element to the patient ID
                const appPatientIdInput= document.querySelector('#appPatientIdInput'); 
                appPatientIdInput.value = data.patientId;
                console.log(appPatientIdInput)

        $('#appModalLabel').text(data.patientName); 
        $('#appPatientName').text(data.patientName); // Update patient name in modal

        $('#appPatientId').text(data.patientId)
        $('#appPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#appModal').modal('show'); // Show the modal
    } );

    // Handle click event on prescription button

    $('#allpat-table tbody').on('click', '#prescButton', function () {
        var data = table.row( $(this).parents('tr') ).data(); // Get data from clicked row
       

                // Set the value of the hidden input element to the patient ID
                const modalPatientIdInput = document.querySelector('#modalPatientIdInput');
                modalPatientIdInput.value = data.patientId;
                // console.log(modalPatientIdInput)

        $('#prescModalLabel').text(data.patientName); // Update modal title with appointment number
        $('#modalPatientName').text(data.patientName); // Update patient name in modal

        $('#modalPatientId').text(data.patientId)
        $('#modalPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#prescModal').modal('show'); // Show the modal
    } );
});

// ---------------- all patients table  end--------------------------------------//



// ---------------- prescriptions table  --------------------------------------//

$(document).ready(function() {
    var table = $('#prescriptions-table').DataTable( {
        columns: [
            { data: 'prescriptionDate' },
            { data: 'medication' },
            { data: 'description' },
            { data: 'doctorName' }
        ]
    } );


});

// ---------------- prescriptions table  end--------------------------------------//





   



  




  