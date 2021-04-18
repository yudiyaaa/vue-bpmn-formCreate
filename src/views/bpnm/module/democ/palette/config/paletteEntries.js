/*
 * @Description:
 * @Autor: YDY
 * @Date: 2021-04-06 09:00:25
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-06 16:39:33
 */
export default {
  'create.start-event': createAction(
    'bpmn:StartEvent',
    'event',
    'bpmn-icon-start-event-none',
    'Create StartEvent'
  ),
  'create.task': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task',
    'Create Task'
  ),
  'create.Gateway': createAction(
    'bpmn:ExclusiveGateway',
    'activity',
    'bpmn-icon-gateway-none',
    'Create Gateway'
  ),
  'create.end-event': createAction(
    'bpmn:EndEvent',
    'activity',
    'bpmn-icon-end-event-none',
    'Create EndEvent'
  ),
  'create.user-task': createAction(
    'bpmn:UserTask',
    'activity',
    'bpmn-icon-user',
    'Create UserTask'
  ),
  'create.hand-tool ': createAction(
    'bpmn:UserTask',
    'tools',
    'bpmn-icon-hand-tool',
    'Activate the hand tool'
  ),
  // 'create.multi': createAction(
  //   'bpmn:group',
  //   'activity',
  //   'bpmn-icon-connection-multi',
  //   'Create group'
  // ),
}

function createAction(type, group, className, title, options) {
  // 还记得 CustomPalette.js 吗？便是这里回调 createListener 函数
  // if (action === 'click') {
  // 		handler(originalEvent, autoActivate, elementFactory, create)
  // 	}
  function createListener (event, autoActivate, elementFactory, create) {
    var shape = elementFactory.createShape({ type })

    create.start(event, shape)
  }

  return {
    group: group,
    className: className,
    title: title,
    action: {
      dragstart: createListener,
      click: createListener
    }
  }
}
