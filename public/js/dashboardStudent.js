$('#shareDataModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var certID = button.data('certid'); // Extract info from data-* attributes

    var modal = $(this);
    modal.find('.modal-title').text(certID);

});


$("#modalCreateProof").on('click', function (event) {
    let certData  =  $("#shareForm").serializeArray().map(function(v) {return v.name;} );
    let certUUID = $("#shareDataModalTitle").text();
    certData = {"sharedAttributes" : certData, certUUID};
    console.log(certData);

    $.ajax({
        url: "../api/generateProof",
        type: "GET",
        data: certData,
        success: function(result){
            console.log("Success");
            console.log(JSON.stringify(result));
            let successModal = $('#shareSuccessModal');
            successModal.find("#shareSuccessModalBody").text(JSON.stringify(result));
            successModal.modal('show');
        },
        error: function (result) {
            console.error("Failiure generating proof");
            let failModal = $('#shareFailModal');
            failModal.find("#shareFailModalBody").text(JSON.stringify(result));
            failModal.modal('show');
        }
    });
});