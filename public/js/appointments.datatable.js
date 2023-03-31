$(document).ready(function() {
    var table = $('#doc-appointment-table').DataTable({
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'patientName' },
            { data: 'patientContact' },
            { data: 'status' },
            { data: 'view' }
        ]
    });

    // Handle click event on view button
    $('#doc-appointment-table tbody').on('click', '#startMeeting', function() {
        // var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        // console.log(data);

        var regNumber = $(this).closest('tr').data('reg-number'); // Get registration number from data attribute

        console.log(regNumber);

        // Redirect user to "/meeting" page
        window.location.href = `/meeting?id=${regNumber}`;

    });

    $('#doc-appointment-table tbody').on('click', '#approveButton', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        console.log(data)

        const appIdInput = document.querySelector('#appId2');
        appIdInput.value = data.appointmentNumber;

        // Set the value of the hidden input element to the patient ID

        // const appIdInput = document.querySelector('#appId');
        // appIdInput.value = data.appointmentNumber;

        // $('#modalPrefDate').text(data.patientName); // Update patient name in modal
        // $("#appPatientEmail").text(data.patientEmail)
        // $("#appPatientEmail").val(data.patientEmail);

        // $('#appPatientId').text(data.patientId)
        // $('#appPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#modal').modal('show'); // Show the modal
    });


});

// ----------------  doctor appointments table table end --------------------------------------//



// ----------------  patients appointment table --------------------------------------//


$(document).ready(function() {
    var table = $('#patient-table').DataTable({
        columns: [
            { data: 'appointmentNumber' },
            { data: 'appointmentDate' },
            { data: 'appointmentTime' },
            { data: 'doctorName' },
            { data: 'doctorContact' },
            { data: 'status' }
        ]
    });

    // Handle click event on view button
    $('#patient-table tbody').on('click', '#rescButton', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        console.log(data)

        const appIdInput = document.querySelector('#appId');
        appIdInput.value = data.appointmentNumber;

        $('#rescModal').modal('show'); // Show the modal
    });
});


// ----------------  patients appointments table end --------------------------------------//



// ---------------- all patients table --------------------------------------//



$(document).ready(function() {
    var table = $('#allpat-table').DataTable({
        columns: [
            { data: 'patientId' },
            { data: 'patientName' },
            { data: 'patientEmail' },
            { data: 'patientContact' },
            { data: 'patientGender' },

            { data: 'action' }
        ]
    });

    $('#allpat-table tbody').on('click', '#appButton', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        console.log(data)

        // Set the value of the hidden input element to the patient ID
        const appPatientIdInput = document.querySelector('#appPatientIdInput');
        appPatientIdInput.value = data.patientId;
        console.log(appPatientIdInput)

        $('#appModalLabel').text(data.patientName);
        $('#appPatientName').text(data.patientName); // Update patient name in modal
        $("#appPatientEmail").text(data.patientEmail)
        $("#appPatientEmail").val(data.patientEmail);

        $('#appPatientId').text(data.patientId)
        $('#appPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#appModal').modal('show'); // Show the modal
    });

    // Handle click event on prescription button

    $('#allpat-table tbody').on('click', '#prescButton', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row

        console.log(data)


        // Set the value of the hidden input element to the patient ID
        const modalPatientIdInput = document.querySelector('#modalPatientIdInput');
        modalPatientIdInput.value = data.patientId;
        // console.log(modalPatientIdInput)

        $('#prescModalLabel').text(data.patientName); // Update modal title with appointment number
        $('#modalPatientName').text(data.patientName); // Update patient name in modal

        $('#modalPatientId').text(data.patientId)
        $('#modalPatientId').val(data.patientId); // Set patient ID in hidden input
        $('#prescModal').modal('show'); // Show the modal
    });
});

// ---------------- all patients table  end--------------------------------------//



// ---------------- prescriptions table  --------------------------------------//

$(document).ready(function() {
    var table = $('#prescriptions-table').DataTable({
        columns: [
            { data: 'prescriptionDate' },
            { data: 'medication' },
            { data: 'description' },
            { data: 'doctorName' }
        ]
    });


});

// ---------------- prescriptions table  end--------------------------------------//