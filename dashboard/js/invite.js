const apiKey = "14f9ad433946de6b245750045d758702231ddb26";
$(document).ready(function () {
  // Initialize DataTable

  $("#addNewButton").on("click", function () {
    getLastUUID();
  });

  $("#addnew").on("click", function () {
    AddNew();
  });

  $list = $("#TableBody");
  // Define your API key

  // Fetch ticket data from the API with the "x-api-key" header
  $.ajax({
    url: "https://bytesotech.cloud/kulan/api/invitation",
    type: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    success: function (data) {
      // Update the DataTable with the retrieved data
      li = JSON.parse(data);
      $.each(li, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        // onclick="getTicketByID(${item.Id})"
        $tr.append(
          `<td><a href="#"  data-toggle="modal" data-target="#exampleModal1">#KUL-${item.uuid}</a></td>`
        );
        $tr.append("<td>" + item.name + "</td>");
        $tr.append("<td>" + item.email + "</td>");
        $tr.append("<td>" + getStatusString(item.invitation_status) + "</td>");

        $list.append($tr);
      });

      // Initialize DataTable after appending rows
      $("#dataTable").DataTable();
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
});

function formatDate(dateString) {
  const parts = dateString.split("T");
  return parts[0];
}

function getTicketByID(id) {
  $.ajax({
    url: `https://bytesotech.cloud/kulan/api/invitation/${id}`,
    type: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    success: function (data1) {
      // Update the DataTable with the retrieved data
      data = JSON.parse(data1);

      $("#t_id").val(data.ticket_number);
      $("#t_name").val(data.ticket_name);
      $("#t_client").val(data.ticket_client);
      $("#t_status").val(data.ticket_status);
      $("#t_date").val(data.ticket_date);
      $("#t_desc").val(data.ticket_description);
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
}

function AddNew() {
  let body = {
    uuid: parseInt($("#uuid").val()),
    name: $("#name").val(),
    email: $("#email").val(),
    expiration_date: $("#exp_date").val(),
    invitation_status: 1,
  };
  $.ajax({
    url: `https://bytesotech.cloud/kulan/api/invitation/`,
    type: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
    success: function (data) {
      Swal.fire({
        icon: "success",
        title: "Invited",
        text: "Your request was successful!",
      });
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
}

function getLastUUID() {
  $.ajax({
    url: "https://bytesotech.cloud/kulan/api/invitation/last/uuid",
    type: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    success: function (data) {
      // Handle the response here
      const lastUUIDNumber = data.lastUUIDNumber;

      $("#uuid").val(lastUUIDNumber + 1);

      // You can perform any further actions with lastTicketNumber here
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
}

function getStatusString(num) {
  switch (num) {
    case 1:
      return "Invited";
    case 2:
      return "Attended";
    case 3:
      return "Pending";
    case 4:
      return "Rejected";
    case 5:
      return "Expired";
    default:
      return "Unknown";
  }
}
