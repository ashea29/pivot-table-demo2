$(function(){
  Papa.parse("https://raw.githubusercontent.com/nicolaskruchten/Rdatasets/master/datasets.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(parsed){
          var csvlist_arr = parsed.data;
          var pkg = $("<optgroup>", {label: ""});
          for(var i in csvlist_arr)
          {
              var dataset = csvlist_arr[i];
              if(dataset.Package != pkg.attr("label"))
              {
                  pkg = $("<optgroup>", {label: dataset.Package}).appendTo($("#csv"));
              }
              pkg.append($("<option>", {value: dataset.Package+"/"+dataset.Item}).text(dataset.Item +":" +dataset.Title));
          }
          $("#csv").chosen();
          var renderers = $.extend(
              $.pivotUtilities.renderers,
              $.pivotUtilities.c3_renderers,
              $.pivotUtilities.d3_renderers,
              $.pivotUtilities.export_renderers
              );
          $("#csv").bind("change", function(event){
              $("#output").empty().text("Loading...")
              var val = $(this).val();
              Papa.parse("https://raw.githubusercontent.com/nicolaskruchten/Rdatasets/master/csv/"+val+".csv", {
                  download: true,
                  skipEmptyLines: true,
                  complete: function(parsed){
                  $("#doc").empty().append(
                      $("<a>",{target:"_blank", href:"http://nicolas.kruchten.com/Rdatasets/doc/"+val+".html"}).html("Dataset documentation &raquo;")
                      );
                      $("#output").pivotUI(parsed.data, {
                          hiddenAttributes: [""],
                          renderers: renderers }, true);
                  }
              });
          });
      }
  });
});

