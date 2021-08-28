<template>
  <div>
    <h1><strong>Updates from SSE:</strong></h1>
    <div>
      <p>Name: {{ eventName }}</p>
      <p>Data: {{ eventData }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
const isJSON = (data) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return false
  }
}

export default {
  name: 'SSEExample',
  data () {
    return {
      evtSource: null,
      eventName: 'Waiting on data...',
      eventData: 'Waiting on data...'
    }
  },
  mounted () {
    this.sse()
    // don't fetch events if tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('tab visibility lost...')
        if (this.evtSource) { this.evtSource.close() }
      } else {
        this.sse()
      }
    })
  },
  destroyed () {
    // close connection when no longer in use
    this.evtSource.close()
  },
  methods: {
    sse () {
      const updateView = (data) => {
        this.eventName = data.eventName
        this.eventData = data.data
      }

      // this.evtSource = new EventSource("http://localhost:3000/sse", { withCredentials: true } );
      this.evtSource = new EventSource('http://localhost:3000/sse')
      console.log('Start getting events', this.evtSource)
      // eslint-disable-next-line func-names
      this.evtSource.onmessage = function (event) {
        console.log('New event....', event)
        const data = isJSON(event.data) || event.data

        if (data.eventName) {
          updateView(data)
        }
      }
      // eslint-disable-next-line func-names
      this.evtSource.onerror = function (err) {
        console.log('Event error....', err)
      }
    }
  }
}
</script>
