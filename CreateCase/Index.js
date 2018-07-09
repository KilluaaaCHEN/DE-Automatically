// ==UserScript==
// @name         Drive-Easy一键创建案件
// @namespace    http://tampermonkey.net/
// @version      3.1.1
// @description  Drive-Easy一键创建案件,安装完成后请修改username变量为你自己的用户名
// @author       KilluaChen
// @match        *test.drive-easy.com/alarm-center/identify-customer*
// @match        *test.drive-easy.com/alarm-center/customer-location*
// @match        *test.drive-easy.com/alarm-center/identify-problem*
// @match        *://54.222.236.241/*/alarm-center/identify-customer*
// @match        *://54.222.236.241/*/alarm-center/customer-location*
// @match        *://54.222.236.241/*/alarm-center/identify-problem*
// @match        https://www.drive-easy.cn/*/alarm-center/identify-customer*
// @match        https://www.drive-easy.cn/*/alarm-center/customer-location*
// @match        https://www.drive-easy.cn/*/alarm-center/identify-problem*

// @grant        none
// ==/UserScript==

(function() {
    var username = 'none'
    var last_name = 'none'
    var is_submit = false
    $(document.body).append('<div style=\'position: fixed;top: 19px;right: 36%;z-index: 999;padding: 5px;\'><button id=\'killua_fill\' style=\'font-size:17px; color: green;border-radius: 3px;\'>&nbsp;Fill&Commit&nbsp;</button></div>')
    $('#killua_fill').click(function() {
        var location = window.location.href
        if (location.indexOf('identify-customer') !== -1) {
            if ($('#client_id').val() != '') {
                $('#proceed').click()
                return false
            }
            var date = new Date()
            $('#user_first_name').val('test_' + username + '_' + date.toLocaleDateString())
            $('#user_last_name').val(last_name)
            $('#user_mobile_number').val('13800138000')
            $('#user_mobile_number2').val('15215221522')
            $('#country_code2').val('+852')
            $('#is_assumed_coverage').click()
            $('#client_id').val(8).change()
            $('#client_case_no').val('test_case_no_123456')
            $('#policy_number').val('test_baodanhao_123456')
        }
        if (location.indexOf('customer-location') !== -1) {
            $('#searchInput').val('上海市闵行区虹桥万科中心')
            window['$BAIDU$']._instances['TANGRAM__1r']._itemClick(event, 0)
            setTimeout(function() {
                $('.address_button button').click()
            }, 1000)
        }
        if (location.indexOf('identify-problem') !== -1) {
            if (is_submit && $('#fk_car_model_id').val() != '') {
                $('#nextBtn').click()
                return false
            }
            $('#vin_number').val('test_chejiahao_66')
            $('#registeration_number').val('沪-' + username + '-666')
            $('#problem_description').val('问题描述...' + username + '_test')
            $('#fk_fault_type_id').val(2).change();
            $('#car_color').val('宝石蓝')
            $('select[name="fuel_type"').val('U')
            $('select[name="transmission_type"').val('M')
            $('#created_on').val('12-09-2015')
            $('#coverage_start_date').val('01-01-2018')
            $('#coverage_end_date').val('12-12-2028')
            $('#year_of_manufacture').val('2015年')
            $('#odometer').val('1249KM')
            $('select[name="location_remark"]').val('Multi-level car park')
            if ($('#primary_service_id').val() == '') {
                $('#primary_service_id').val(3).change()
            }
            if ($('#fk_car_make_id').val() == '') {
                $('#fk_car_make_id').val(3).change()
            }
            var interval_t = setInterval(function() {
                if ($('#fk_fault_sub_type_id').children().length !== 1) {
                    $('#fk_fault_sub_type_id').val(11).change()
                    clearInterval(interval_t)
                }
            }, 100)
            var interval_m = setInterval(function() {
                if ($('#fk_car_model_id').children().length !== 1) {
                    $('#fk_car_model_id').val(32).change()
                    clearInterval(interval_m)
                }
            }, 100)
            var interval_s = setInterval(function() {
                if ($('#primary_sub_service_id').children().length !== 1) {
                    $('#primary_sub_service_id').val(2)
                    is_submit = true
                    clearInterval(interval_s)
                }
            }, 100)
        }
        var buttonArr = $('button[type=submit]').offset()
        var inputArr = $('input[type=submit]').offset()
        var top = 0
        if (buttonArr != null) {
            top = buttonArr.top
        }
        if (inputArr != null) {
            top = inputArr.top
        }
        $('html,body').animate({
            scrollTop: top
        }, 100)
    })
})()
