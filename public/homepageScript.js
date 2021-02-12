import { Storage } from '@google-cloud/storage';

const gc = new Storage({
  keyFilename: path.join(__filename, './bell-3-bdcd5c56d905.json'),
  projectId: "bell-3"
});

const firstbucket=gc.bucket('bell-3_first_bucket');
console.log("first bucket: ",firstbucket);

const videostreaming = gc.bucket("video-streaming1");
console.log('Video Streaming: ',videostreaming);