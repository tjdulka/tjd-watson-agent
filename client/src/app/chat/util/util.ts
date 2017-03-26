/**
* @Date:   2016-12-18T19:01:21-06:00
* @Last modified time: 2017-03-03T10:34:16-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



// NOT GOOD! Need to find the right angular hook!
// Problem is the scroll is occurring before the messages are rendered.
// Maybe need to emit an event when it is rendered and redraw then?
function scrollToBottomOfChat() {
  setTimeout(() => {
    let container = document.getElementById('scrolling-chat-box')
    container.scrollTop = container.scrollHeight
  }, 100)
}

export {scrollToBottomOfChat}
