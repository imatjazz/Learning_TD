import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


{
  "status":{"code":10000,"description":"Ok","req_id":"bcdc3e6c9efa42199a95e8f49b765ee1"},
  "outputs":[{"id":"b99b338623dc43e6962935faa97d44d7",
              "status":{"code":10000,"description":"Ok"},
              "created_at":"2019-08-13T12:48:29.047613982Z",
              "model":{
                      "id":"a403429f2ddf4b49b307e318f00e528b",
                      "name":"face",
                      "created_at":"2016-10-25T19:30:38.541073Z",
                      "app_id":"main",
                      "output_info":{
                        "message":"Show output_info with: GET /models/{model_id}/output_info",
                        "type":"facedetect","type_ext":"facedetect"},
                      "model_version":{
                        "id":"34ce21a40cc24b6b96ffee54aabff139",
                        "created_at":"2019-01-17T19:45:49.087547Z",
                        "status":{"code":21100,"description":"Model trained successfully"},
                        "worker_id":"84ae6a126b614536b1668ff28ed3e36b"},
                      "display_name":"Face Detection"
                      },
              "input":{
                      "id":"b1db66b048cb42b9a81efaf4eb6571d1",
                      "data":{"image":{"url":"https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg"}}},
                      "data":{
                              "regions":[{"id":"9ds0gld35hhq","region_info":{"bounding_box":{"top_row":0.15735051,"left_col":0.32815054,"bottom_row":0.8411659,"right_col":0.6545954}}}]}}],
                              "rawData":{"status":{"code":10000,"description":"Ok","req_id":"bcdc3e6c9efa42199a95e8f49b765ee1"},
                                        "outputs":[{"id":"b99b338623dc43e6962935faa97d44d7","status":{"code":10000,"description":"Ok"},"created_at":"2019-08-13T12:48:29.047613982Z","model":{"id":"a403429f2ddf4b49b307e318f00e528b","name":"face","created_at":"2016-10-25T19:30:38.541073Z","app_id":"main","output_info":{"message":"Show output_info with: GET /models/{model_id}/output_info","type":"facedetect","type_ext":"facedetect"},"model_version":{"id":"34ce21a40cc24b6b96ffee54aabff139","created_at":"2019-01-17T19:45:49.087547Z","status":{"code":21100,"description":"Model trained successfully"},"worker_id":"84ae6a126b614536b1668ff28ed3e36b"},"display_name":"Face Detection"},"input":{"id":"b1db66b048cb42b9a81efaf4eb6571d1","data":{"image":{"url":"https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg"}}},"data":{"regions":[{"id":"9ds0gld35hhq","region_info":{"bounding_box":{"top_row":0.15735051,"left_col":0.32815054,"bottom_row":0.8411659,"right_col":0.6545954}}}]}}]}}