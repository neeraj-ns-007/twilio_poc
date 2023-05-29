'use strict';

const otpCheckbox = $('.for-otp');
const totpCheckbox = $('.for-totp');
const loginModal = $('.login-btn_c');
const codeInputFields = $('.code-input');
const getCodeURL = loginModal.data('url');
const getVerifyURL = loginModal.data('verifyurl');
const loginFormSubmitBtn = $('.login').find(':submit');
const registerFormSubmitBtn = $('.registration').find(':submit');
const modalClosebtn = $('.close-modal-icon');

$(function () {

    $(document).on('click', '.validate', function() {
        let code = '';
        codeInputFields.each(function() {
            code += $(this).val();
        });

        $.ajax({
            url: getVerifyURL,
            type: 'get',
            dataType: 'json',
            data: {
                code: code,
                phoneNumber: $(this).data('phone-number')
            },
            success: function (data) {
                let activeTab = '';
                if (data.res === 'OK') {
                    $('.tab-pane').each(function() {
                        if ($(this).hasClass('active') == true){
                            activeTab = $(this).attr('id');
                        }
                    });

                    modalClosebtn.trigger('click');

                    if (activeTab === 'login') {
                        loginFormSubmitBtn.trigger('click');
                    }

                    if (activeTab === 'register') {
                        registerFormSubmitBtn.trigger('click');
                    }
                }
            }
        })
    });

    $('#loginOTPModal').on('shown.bs.modal', function() {
        $(this).find('input:first').trigger('focus');
    });

    $(document).on('click', '.for-otp', function () {
        if (totpCheckbox.prop('checked') === true) {
            totpCheckbox.prop('checked', false);
        }
        loginModal.attr('data-target', '#' + otpCheckbox.data('toggle-modal-id'));
    });

    $(document).on('click', '.for-totp', function () {
        if (otpCheckbox.prop('checked') === true) {
            otpCheckbox.prop('checked', false);
        }
        loginModal.attr('data-target', '#' + totpCheckbox.data('toggle-modal-id'));
    });

    $(document).on('click', '.login-btn_c', function () {
        let email = '';
        if ($('#login-form-email').val().length !== 0 && otpCheckbox.prop('checked')) {
            email = $('#login-form-email').val();

            $.ajax({
                url: getCodeURL,
                type: 'get',
                dataType: 'json',
                data: {
                    email: email
                },
                success: function (data) {
                    $('.validate').attr('data-phone-number', data.phoneNumber);
                    $('.head-sec p:nth-of-type(3)').append(data.phoneNumber.slice(0, 6) + 'XXXX');
                }
            })
        } else {
            alert('Please enter an email');
        }
    })

    $(document).on('keyup', '.code-input', function (e) {
        if ($(this).val().length !== 0 && e.key !== 'Backspace') {
            $(this).next().trigger('focus');
        }
        if($(this).val().length === 0 && e.key === 'Backspace') {
            $(this).prev().trigger('focus');
        }
    });

    $(document).on('click', '.register-btn_c', function () {
        let phoneNumber = $('#registration-form-phone').val()
        if (phoneNumber.length !== 0) {
            $.ajax({
                url: $(this).data('url'),
                type: 'get',
                dataType: 'json',
                data: {
                    phoneNumber: phoneNumber
                },
                success: function () {
                    $('.validate').attr('data-phone-number', $('#registration-form-phone').val());
                    $('.head-sec p:nth-of-type(3)').append(phoneNumber.slice(0, 6) + 'XXXX');
                }
            });
        } else {
            alert('Please enter an email');
        }
    })

});