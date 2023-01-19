<template>
  <div>
    <q-card dark bordered class="bg-grey-9 my-card" style="margin-top:20px; width: 300px;">
      <q-card-section>
        <img :src=image.imageUrl alt="Mi imagen" style="width:100%; height:200px; object-fit: cover;">
        <div class="text-subtitle2">Uploaded by: {{ image.nameUser }}</div>
        <q-btn @click="handleDeleteImage(image.id)" type="button" class="bg-red-7 text-bold" color="red" text-color="white" size="10px" label="DELETE" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  props: {
    handleDeleteImage: Function

  }
}
</script>
<style >

</style>
