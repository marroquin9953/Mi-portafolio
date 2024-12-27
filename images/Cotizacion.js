let isSubmitting = false; // Variable global para evitar múltiples envíos

function init() {
    // Asociar el evento de envío solo una vez
    $("#cotizacion_form").off("submit.cotizacion").on("submit.cotizacion", function (e) {
        guardar(e);
    });
}

$(document).ready(function () {
    init();
});

function showProcessingAlert() {
    Swal.fire({
        title: "Procesando...",
        html: '<div class="spinner"></div>',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            // Agregar animación spinner
            const spinnerStyle = `
                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                    margin: 10px auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            const style = document.createElement("style");
            style.textContent = spinnerStyle;
            document.head.appendChild(style);
        },
    });
}

function guardar(e) {
    e.preventDefault(); // Prevenir la recarga de la página

    // Verifica si ya se está procesando un envío
    if (isSubmitting) return;

    isSubmitting = true; // Marca el estado como en proceso

    var formData = new FormData($("#cotizacion_form")[0]); // Captura los datos del formulario
    var $submitButton = $("#cotizacion_form button[type='submit']"); // Botón de envío

    // Deshabilitar el botón de envío para evitar múltiples clics
    $submitButton.prop("disabled", true);

    // Mostrar alerta de procesamiento
    showProcessingAlert();

    $.ajax({
        url: "controller/usuario.php?op=guardarSolicitud",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            Swal.close(); // Cerrar la alerta de procesamiento

            if (data == 1) {
                Swal.fire({
                    icon: "success",
                    title: "Solicitud enviada",
                    text: "¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                $("#cotizacion_form")[0].reset(); // Reinicia el formulario
            } else if (data == 2) {
                Swal.fire({
                    icon: "error",
                    title: "Ya tienes una solicitud pendiente",
                    text: "Nos pondremos en contacto contigo lo más pronto posible.",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error al enviar la solicitud. Por favor, inténtalo nuevamente.",
                    showConfirmButton: true,
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.close(); // Cerrar la alerta de procesamiento
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.",
                showConfirmButton: true,
            });
            console.error("Error AJAX: ", error);
        },
        complete: function () {
            // Rehabilita el botón de envío y el estado de procesamiento
            $submitButton.prop("disabled", false);
            isSubmitting = false; // Marca que la solicitud ha terminado
        },
    });
}
