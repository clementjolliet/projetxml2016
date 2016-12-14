declare namespace json="http://www.json.org";

declare option exist:serialize "method=json media-type=application/json";

<json:value>
{
 
for $v in doc("merimee-MH.xml")/csv_data/row
  let $u:=$v/DPT
group by $u
order by $u
return
(
  <json:value json:array="true">
    <data>{distinct-values($v/DPT/text())}</data>
    <nombre>{count($v/REF)}</nombre>
  </json:value>
)

}
</json:value>