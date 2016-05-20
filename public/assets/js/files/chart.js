$(document).ready(function() { 
    // $('.modal-trigger').leanModal();
    var modal =  $('#chart-modal');
    modal.width(800);
    
    // 绘图
    var encChartBtn = $('.enc-chart-btn');
    var decChartBtn = $('.dec-chart-btn');
    var fileTable = $('.file-list');
    var chart = new G2.Chart({
        id: 'time-chart',
        width : 720,
        height : 350
    }); // 创建图表
    
    encChartBtn.on('click', function() {
        var childCheckBox = fileTable.find('tbody input:checked');
        var row = {
            className: '.file-name',
            title: '文件名'
        }
        var col = {
            className: '.enc-time',
            title: '加密时间 (s)'
        }
        var header = '加密时间统计图';
        
        chart.clear();
        setChart(childCheckBox, row, col, header);
    })
    
    decChartBtn.on('click', function() {
        var childCheckBox = fileTable.find('tbody input:checked');
        var row = {
            className: '.file-name',
            title: '文件名'
        }
        var col = {
            className: '.dec-time',
            title: '解密时间 (s)'
        }
        var header = '解密时间统计图';
        
        chart.clear();
        setChart(childCheckBox, row, col, header);
    })
    
    function setChart(elm, row, col, header) {
        if (elm.length) {
            var timeData = [];
            var len = elm.length;
            
            for (var i = 0; i < len; i++) {
                var data = getRowData(elm[i], row.className, col.className);
                timeData.push(data);
            }
            
            chart.source(timeData); // 载入数据源
            chart.interval().position('row*col').color('row'); // 使用图形语法绘制柱状图
            chart.axis('row', {
                title: {
                    text: row.title
                }
            });
            chart.axis('col', {
                title: {
                    text: col.title
                }
            });
            chart.render();
            
            modal.find('h5').text(header);
            modal.openModal();
        } else {
            alert('请选择文件');
        }
    }
    
    function getRowData(elm, rowClass, colClass) {
        var data = {};
        var row = $(elm).parents('tr');
        var fileName = row.find(rowClass).text();
        data.row = fileName.slice(fileName.indexOf('-') + 1);
        var time = row.find(colClass).text();
        data.col = Number(time.trim().slice(0, -1)); 
        
        return data;
    }
});
