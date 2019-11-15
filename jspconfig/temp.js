let timeStrap=(new Date()).getTime()
module.exports={
  top: `<!DOCTYPE html>
    <%@ page language="java" pageEncoding="UTF-8" session="false" contentType="text/html; charset=UTF-8"%>
    <%@ include file="/WEB-INF/pages/common/commonPage.jsp"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <head>
    <meta charset="utf-8" />
    <title>氧车乐公司运营系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Preview page of Metronic Admin Theme #3 for " name="description" />
    <meta content="" name="author" />
    
    <link rel="shortcut icon" href="favicon.ico" />
    <%--页面插件 开始--%>
    <link href="/resources/assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/bootstrap/popoverx/css/bootstrap-popover-x.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/global/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/resources/css/otoc-basic/otoc-list.css?t=${timeStrap}" rel="stylesheet" type="text/css" />
    <link href="/resources/css/otoc-basic/otoc-report.css?t=${timeStrap}" rel="stylesheet" type="text/css"/>
    <link href="/resources/js/common/YclTable-Initialization.css?t=${timeStrap}" rel="stylesheet" type="text/css" />
    <%--页面插件 结束--%>
    </head>
    <body>
    <%@ include file="/WEB-INF/pages/common/header.jsp"%>
    
    <%--我们需改变iframe的src路由--%>`,
  bottom: ` <%@ include file="/WEB-INF/pages/common/footer.jsp"%>
    <!-- BEGIN QUICK NAV -->
    <%@ include file="/WEB-INF/pages/common/quickNav.jsp"%>
    <!-- END QUICK NAV -->
    <script src="/resources/assets/global/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js" type="text/javascript"></script>
    <script src="/resources/assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js" type="text/javascript"></script>
    <script src="/resources/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="/resources/assets/global/plugins/bootstrap-typeahead/bootstrap3-typeahead.min.js" type="text/javascript"></script>
    <script src="/resources/assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
    <script src="/resources/bootstrap/popoverx/js/bootstrap-popover-x.js" type="text/javascript"></script>
    <script>
    window.addEventListener('message',function(e){
    document.getElementById('vue-iframe').height=e.data
    })
    </script>
    </body>
    </html>`
}