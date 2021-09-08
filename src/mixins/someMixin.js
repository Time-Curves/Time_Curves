
module.exports = {
  mounted() {
    console.log('mixin hook called');
    console.log(this.someMixin());
  },
  methods: {
    someMixin() {
      return 'mixin has worked';
    },
  },
};


