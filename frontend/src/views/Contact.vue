<template>
<!DOCTYPE html>
<html lang="en">
  <div>
        <div class="container-fluid center">
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Question</label>
                <input class="form-control" id="exampleFormControlInput1" placeholder="">
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect2">Example multiple select</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </form>
        <button id="show-modal" @click="show = true">Show Modal</button>
        </div>
    </div>
</html>
</template>

<script>


export default {
  name: 'Contact',
  components: {
  },
  data() {
    return {
        showModal: false
        }
    },
  methods: {
      show(){}
  }
}
</script>

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>