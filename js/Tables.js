function renderTable(file,htmlid){
              var dataset = new recline.Model.Dataset({
                url: file,
                // optional rows parameter specifies how many rows to retrieve - default is a 1000
                // rows: 5000
                backend: 'dataproxy'
              });

              // async again as we fetch via AJAX behind the scenes
              // once data is fetched it will be stored in a local MemoryStore so further querying will not involve the DataProxy
              dataset.fetch();

              // For demonstrations purposes display the data in a grid
              var grid = new recline.View.Grid({
                model: dataset
              });
              $('#'+htmlid).append(grid.el);
  }