<template>
  <ul class="slds-button-group-row">
    <li class="slds-button-group-item">

      <button class="slds-button slds-button_neutral" @click="showDockPanel('task')"><span
          class="slds-icon_container slds-icon-standard-task"><svg class="slds-icon slds-icon_large" aria-hidden="true">
            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#task"></use>
          </svg></span>Task</button>
    </li>
    <li class="slds-button-group-item">
      <button class="slds-button slds-button_neutral" @click="showDockPanel('event')"><span
          class="slds-icon_container slds-icon-standard-event"><svg class="slds-icon slds-icon_large"
            aria-hidden="true">
            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#event"></use>
          </svg></span>Event</button>
    </li>
    <li class="slds-button-group-item">
      <button class="slds-button slds-button_neutral" @click="showDockPanel('call')"><span
          class="slds-icon_container slds-icon-standard-log-a-call"><svg class="slds-icon slds-icon_large"
            aria-hidden="true">
            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#log_a_call"></use>
          </svg></span>Call</button>
    </li>
  </ul>
  <div v-if="propertyStore.activities && propertyStore.activities.length > 0">
    <div class="links">
      <!-- <a href="" @click.prevent="expandAll">Refresh</a> -->
      <a v-if="!isExpanded" href="#" @click.prevent="expandAll">Expand All</a>
      <a v-if="isExpanded" href="#" @click.prevent="collapseAll">Collapse All</a>
    </div>

    <UiItemExpandableSection label="Upcoming & Overdue">
      <ul class="slds-timeline">
        <li v-for="(activity, i) in propertyStore.activities">
          <div class="slds-timeline__item_expandable slds-timeline__item_task"
            :class="{ 'slds-is-open': activity.isOpen }">

            <span class="slds-assistive-text">{{ activity.type }}</span>
            <div class="slds-media">
              <div class="slds-media__figure">
                <button @click="toggleActivity(activity)" class="slds-button slds-button_icon switch-button"
                  aria-expanded="true">
                  <svg class="slds-button__icon slds-timeline__details-action-icon" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>
                  </svg>
                  <span class="slds-assistive-text">Toggle details for {{ activity.subject }}</span>
                </button>
                <div v-if="activity.type === 'task'"
                  class="slds-icon_container slds-icon-standard-task slds-timeline__icon" title="task">
                  <svg class="slds-icon slds-icon_small" aria-hidden="true">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#task"></use>
                  </svg>
                </div>
                <div v-if="activity.type === 'event'"
                  class="slds-icon_container slds-icon-standard-event slds-timeline__icon" title="event">
                  <svg class="slds-icon slds-icon_small" aria-hidden="true">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#event"></use>
                  </svg>
                </div>
                <div v-if="activity.type === 'call'"
                  class="slds-icon_container slds-icon-standard-log-a-call slds-timeline__icon" title="call">
                  <svg class="slds-icon slds-icon_small" aria-hidden="true">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#log_a_call"></use>
                  </svg>
                </div>

              </div>
              <div class="slds-media__body">
                <div class="slds-grid slds-grid_align-spread slds-timeline__trigger">
                  <div class="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
                    <div v-if="activity.type === 'task'" class="slds-checkbox">
                      <input type="checkbox" name="options" :id="'task-checkbox-id-' + i" value="true" />
                      <label class="slds-checkbox__label" :for="'task-checkbox-id-' + i"
                        @click="handleTaskStatus(activity)">
                        <span class="slds-checkbox_faux"></span>
                        <span class="slds-form-element__label slds-assistive-text">{{ activity.comments }}</span>
                      </label>
                    </div>
                    <h3 :class="{ 'completed': activity.status === 'Completed' }" class="slds-truncate"
                      :title="activity.subject">
                      <a href="#" @click.prevent="() => false">
                        <strong>{{ activity.subject }}</strong>
                      </a>
                    </h3>
                  </div>
                  <div class="slds-timeline__actions slds-timeline__actions_inline">
                    <p class="slds-timeline__date">{{ formatDate(activity) }}</p>
                    <div class="slds-dropdown-trigger slds-dropdown-trigger_click"
                      :class="{ 'slds-is-open': activity.showActionMenu }">
                      <button @click.stop="toggleActionMenu(activity)"
                        class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                        aria-haspopup="true" title="More Options for this item">
                        <svg class="slds-button__icon" aria-hidden="true">
                          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                        </svg>
                        <span class="slds-assistive-text">More Options for this item</span>
                      </button>
                      <div class="slds-dropdown slds-dropdown_right">
                        <ul class="slds-dropdown__list" role="menu" aria-label="Show More">
                          <li class="slds-dropdown__item" role="presentation">
                            <a href="#" role="menuitem" tabindex="0" @click.prevent="editActivity(activity)">
                              <span class="slds-truncate" title="Edit">Edit</span>
                            </a>
                          </li>
                          <li class="slds-dropdown__item" role="presentation">
                            <a href="#" role="menuitem" tabindex="-1" @click.prevent="deleteActivity(activity.id)">
                              <span class="slds-truncate" title="Delete">Delete</span>
                            </a>
                          </li>
                          <li class="slds-dropdown__item" role="presentation">
                            <a @click.prevent="editActivityComment(activity)" href="#" role="menuitem" tabindex="-1">
                              <span class="slds-truncate" title="Edit Comments">Edit Comments</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                <p class="slds-m-horizontal_xx-small">
                  <span style="color: #1f6477;">{{ activity.owner?.Name }}</span> created <span
                    v-if="activity.type === 'event'">an</span><span v-else>a</span> {{ activity.type.toLowerCase() }}
                  with
                  <a href="javascript;" @click.prevent="openUrl(activity.user)">{{
                    activity.user?.Name }}</a>
                </p>
                <article
                  class="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small slds-p-around_medium"
                  id="task-item-expanded-21">
                  <ul class="slds-list_horizontal slds-wrap">
                    <li v-if="activity.user?.Name"
                      class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                      <span class="slds-text-title slds-p-bottom_x-small">Name</span>
                      <span class="slds-text-body_medium slds-truncate">
                        <a href="#">{{ activity.user?.Name }}</a>
                      </span>
                    </li>
                    <li v-if="activity.propertyId"
                      class="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
                      <span class="slds-text-title slds-p-bottom_x-small">Related To</span>
                      <span class="slds-text-body_medium slds-truncate">
                        <a href="#">{{ propertyStore.property.name }}</a>
                      </span>
                    </li>
                  </ul>
                  <div v-if="activity.comments">
                    <span class="slds-text-title">Comments</span>
                    <p class="slds-p-top_x-small">{{ activity.comments }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </li>

      </ul>
    </UiItemExpandableSection>
  </div>
  <div class="no-records" v-else>No activities added yet.</div>
  <UiItemModal :is-visible="globalState.modalName === 'Create_Activity'" :size="'small'" @close="closeModal">
    <template v-if="activityType === 'task' || activityType === 'call' || activityType === 'event'" #header>
      New {{ activityType }}
    </template>
    <template v-else #header>
      Edit {{ activityStore.activity?.subject }}
    </template>
    <PropertyItemActivitiesTask :related-to="propertyStore.property.name" v-if="activityType === 'task'"
      v-model="taskModel" />
    <PropertyItemActivitiesEvent :related-to="propertyStore.property.name" v-else-if="activityType === 'event'"
      v-model="eventModel" />
    <PropertyItemActivitiesCall :related-to="propertyStore.property.name" v-else-if="activityType === 'call'"
      v-model="callModel" />
    <PropertyItemActivitiesEditTask :related-to="propertyStore.property.name" v-if="activityType === 'edit-task'"
      v-model="taskModel" />
    <PropertyItemActivitiesEditEvent :related-to="propertyStore.property.name" v-if="activityType === 'edit-event'"
      v-model="eventModel" />
    <PropertyItemActivitiesEditCall :related-to="propertyStore.property.name" v-if="activityType === 'edit-call'"
      v-model="callModel" />
    <template #footer>
      <UiItemInlineLoader />
      <button class="slds-button slds-button_brand" @click="saveActivity(activityType)">Save</button>
    </template>
  </UiItemModal>

</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';

import type { Activity, LinkedContact } from '~/stores/Models';
const globalState = useMyGlobalStateStore()
const runtimeConfig = useRuntimeConfig();
const propertyStore = useMyPropertyStore();
const toastStore = useToastStore()
const auth = useAuthStore()
const activityStore = useMyActivityStore();
const isExpanded = ref(false)
const activityType = ref('')

const handleTaskStatus = (activity: Activity) => {
  activity.status = activity.status === 'Pending' ? 'Completed' : 'Pending';
  activityStore.createActivity(activity).then((r: any) => console.log(r));
}

const showDockPanel = (type: string) => {
  if (type === 'task') {
    activityType.value = "task"
  }
  else if (type === 'event') {
    activityType.value = "event"
  }
  else {
    activityType.value = "call"
  }

  globalState.openModal('Create_Activity')

}

const closeModal = () => {
  globalState.closeModal();
}

const openUrl = (user: LinkedContact) => {
  const url = getOneCapContactLink(runtimeConfig.public.oneCapEnvironment, user.Id);
  if (url) {
    window.open(url, 'salesforcePopup');
  }
}


function formatDate(activity: Activity) {
  let dueDate = null;
  if (activity.type === 'Task' && activity.dueDate!) {
    dueDate = new Date(activity.dueDate!)
  }
  else if (activity.type === 'Event' && activity.startDate!) {
    dueDate = new Date(activity.startDate!)
  }


  if (dueDate) {
    // Format hours and minutes
    let hours = dueDate.getHours();
    const minutes = dueDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format

    // Format date
    const month = dueDate.getMonth() + 1; // Months are zero-indexed
    const day = dueDate.getDate();
    const year = dueDate.getFullYear().toString().slice(-2); // Get last two digits of year

    // Combine into desired format
    return `${hours}:${minutes.toString().padStart(2, "0")}${ampm} | ${month}/${day}/${year}`;
  }
  return '';
}

const toggleActivity = (activity: Activity) => {
  activity.isOpen = !activity.isOpen;
}

const toggleActionMenu = (activity: any) => {
  if (!activity.subject) {
    activity = propertyStore.activities.find(a => a.showActionMenu === true)
  }

  if (activity) {
    activity.showActionMenu = !activity.showActionMenu
  }

}

const editActivity = (activity: Activity) => {
  activityType.value = "edit-" + activity.type;
  activityStore.editActivityId = activity.id;
  activityStore.activity = activity;

  if (activity.type === 'task') {
    taskModel.value = { ...taskModel.value, ...activity }
  }
  else if (activity.type === 'event') {
    eventModel.value = { ...eventModel.value, ...activity }
  }
  else if (activity.type === 'call') {
    callModel.value = { ...callModel.value, ...activity }
  }
  globalState.openModal('Create_Activity');


}
const deleteActivity = async (activityId: string) => {
  const result = await activityStore.deleteActivity(activityId);
  if (result) {
    propertyStore.activities = propertyStore.activities.filter(a => a.id !== activityId)
  }
}
const editActivityComment = (activity: Activity) => { console.log(activity) }

onMounted(async () => {
  window.addEventListener('click', toggleActionMenu)
  propertyStore.activities = await activityStore.getActivities(propertyStore.property.id)


});

onBeforeUnmount(() => {
  window.removeEventListener('click', toggleActionMenu)
})

const taskModel: any = ref({ id: null, subject: "", dueDate: null, assignedTo: null, user: null, relatedTo: "", currency: "USD - U.S Dollar", comments: "", priority: "Normal", status: "Pending", reminder: false, reminderDate: null, reminderTime: null, reminderDateTime: null })


const eventModel: any = ref({ id: null, subject: "", comments: "", startDate: null, startTime: null, endDate: null, endTime: null, location: "", user: null, relatedTo: null, allDayEvent: null, priority: "Normal", status: "Pending", reminder: false, reminderDate: null, reminderTime: null, reminderDateTime: null })

const callModel: any = ref({ id: null, subject: "", comments: "", user: null, relatedTo: null })

const saveActivity = async (type: string) => {

  let activity: any = null;

  const owner = { Id: auth.getUserEmail(), Name: auth.getUserName() }

  if (type === 'task' || type === 'edit-task') {
    const reminderDate = taskModel.value.reminderDate ? new Date(taskModel.value.reminderDate).toISOString() : null;

    activity = {
      id: taskModel.value.id || uuidv4(),
      type: "task",
      dueDate: taskModel.value.dueDate ? new Date(taskModel.value.dueDate).toISOString() : null,
      subject: taskModel.value.subject,
      owner: owner,
      assignedTo: taskModel.value.assignedTo,
      user: taskModel.value.user,
      propertyId: propertyStore.property.id,
      isOpen: false,
      status: taskModel.value.status,
      currency: taskModel.value.currency,
      comments: taskModel.value.comments,
      priority: taskModel.value.priority,
      reminder: taskModel.value.reminder,
      reminderDate: reminderDate,
      reminderTime: taskModel.value.reminderTime,
    }

  }
  else if (type === 'event' || type === 'edit-event') {
    const reminderDate = eventModel.value.reminderDate ? new Date(eventModel.value.reminderDate).toISOString() : null;

    activity = {
      id: eventModel.value.id || uuidv4(),
      type: "event",
      startDate: eventModel.value.startDate ? new Date(eventModel.value.startDate).toISOString() : null,
      startTime: eventModel.value.startTime,
      endDate: eventModel.value.endDate ? new Date(eventModel.value.endDate).toISOString() : null,
      endTime: eventModel.value.endTime,
      allDayEvent: eventModel.value.allDayEvent,
      eventType: eventModel.value.eventType,
      subject: eventModel.value.subject,
      comments: eventModel.value.comments,
      owner: owner,
      user: eventModel.value.user,
      location: eventModel.value.location,
      propertyId: propertyStore.property.id,
      reminder: eventModel.value.reminder,
      reminderDate: reminderDate,
      reminderTime: eventModel.value.reminderTime,
      isOpen: false,
    }

  }
  else if (type === 'call' || type === 'edit-call') {
    const reminderDate = callModel.value.reminderDate ? new Date(callModel.value.reminderDate).toISOString() : null;

    activity = {
      id: callModel.value.id || uuidv4(),
      type: "call",
      subject: callModel.value.subject,
      comments: callModel.value.comments,
      owner: owner,
      user: callModel.value.user,
      dueDate: callModel.value.dueDate ? new Date(callModel.value.dueDate).toISOString() : null,
      assignedTo: callModel.value.assignedTo,
      propertyId: propertyStore.property.id,
      isOpen: false,
      status: callModel.value.status,
      currency: callModel.value.currency,
      priority: callModel.value.priority,
      reminder: callModel.value.reminder,
      reminderDate: reminderDate,
      reminderTime: callModel.value.reminderTime,
    }

  }

  if (activity) {
    const result = await activityStore.createActivity(activity);
    if (result) {
      toastStore.addToast({
        type: "success",
        id: 1,
        message: "Activity created successfully.",
      });

      if (type === 'edit-task' || type === 'edit-event' || type === 'edit-call') {
        const activityIndex = propertyStore.activities.findIndex((a: any) => a.id === activity.id);
        propertyStore.activities.splice(activityIndex, 1, activity)
      }
      else {
        propertyStore.activities.push(activity);
      }
    }
  }

  activityType.value = '';

  globalState.closeModal();

}

const expandAll = () => {
  isExpanded.value = true;
  propertyStore.activities = propertyStore.activities.map((a: Activity) => { a.isOpen = true; return a; });
}

const collapseAll = () => {
  isExpanded.value = false;
  propertyStore.activities = propertyStore.activities.map((a: Activity) => { a.isOpen = false; return a; });

}

</script>

<style scoped>
.links {
  padding: 0.5rem 0.25rem;
  padding-bottom: 0;
  text-align: right;
}

.links a {
  padding: 0.25rem;
}

.slds-timeline {
  max-height: 30rem;
  overflow-y: auto;
  min-height: 15rem;
}


.slds-button-group-item .slds-icon_container {
  margin-right: 0.35rem;
}

.slds-button-group-item .slds-icon_container svg {
  width: 1rem;
  height: 1rem;
}

.slds-button-group-item .slds-button {
  padding: 0rem 0.75rem;
}

.switch-button {
  margin-top: -1.35rem;
}

.no-records {
  width: 100%;
  margin-bottom: 0;
  background: #efefef;
  border-radius: 4px;
}

.completed {
  text-decoration: line-through;
}
</style>