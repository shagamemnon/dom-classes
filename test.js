var classes = require('./');

var el;
beforeEach(function(){
  el = document.createElement('div');
  el.classList = undefined;
});

describe('add(element, class)', function(){
  it('should add a class', function(){
    classes.add(el, 'foo');
    expect('foo').to.be.equal(el.className);
  });

  it('should not add the same class twice', function(){
    classes.add(el, 'foo');
    classes.add(el, 'foo');
    classes.add(el, 'foo');
    classes.add(el, 'bar');
    expect('foo bar').to.be.equal(el.className);
  });

});

describe('remove(el, class)', function(){

  it('should remove a class from the beginning', function(){
    el.className = 'foo bar baz';
    classes.remove(el, 'foo');
    expect('bar baz').to.be.equal(el.className);
  });

  it('should remove a class from the middle', function(){
    el.className = 'foo bar baz';
    classes.remove(el, 'bar');
    expect('foo baz').to.be.equal(el.className);
  });

  it('should remove a class from the end', function(){
    el.className = 'foo bar baz';
    classes.remove(el, 'baz');
    expect('foo bar').to.be.equal(el.className);
  });
});

describe('remove(el, regexp)', function(){
  it('should remove matching classes', function(){
    el.className = 'foo item-1 item-2 bar';
    classes.remove(el, /^item-/);
    expect('foo bar').to.be.equal(el.className);
  });
});

describe('toggle(el, class)', function(){
  describe('when present', function(){
    it('should remove the class', function(){
      el.className = 'foo bar hidden';
      classes.toggle(el, 'hidden');
      expect('foo bar').to.be.equal(el.className);
    });
  });

  describe('when not present', function(){
    it('should add the class', function(){
      el.className = 'foo bar';
      classes.toggle(el, 'hidden');
      expect('foo bar hidden').to.be.equal(el.className);
    });
  });
});

describe('has(el, class)', function(){
  it('should check if the class is present', function(){
    el.className = 'hey there';
    expect(classes.has(el, 'foo')).to.be.false;
    expect(classes.has(el, 'hey')).to.be.true;
    expect(classes.has(el, 'there')).to.be.true;
  });
});

describe('classes(el)', function(){
  it('should return an array of classes', function(){
    el.className = 'foo bar baz';
    var ret = classes(el);
    expect('foo').to.be.equal(ret[0]);
    expect('bar').to.be.equal(ret[1]);
    expect('baz').to.be.equal(ret[2]);
  });

  it('should return an empty array when no className is defined', function(){
    var ret = classes(el);
    expect(0).to.be.equal(ret.length);
  });

  it('should ignore leading whitespace', function(){
    el.className = '  foo bar    baz';
    var ret = classes(el);
    expect('foo').to.be.equal(ret[0]);
    expect('bar').to.be.equal(ret[1]);
    expect('baz').to.be.equal(ret[2]);
    expect(3).to.be.equal(ret.length);
  });

  it('should ignore trailing whitespace', function(){
    el.className = 'foo bar   baz     ';
    var ret = classes(el);
    expect('foo').to.be.equal(ret[0]);
    expect('bar').to.be.equal(ret[1]);
    expect('baz').to.be.equal(ret[2]);
    expect(3).to.be.equal(ret.length);
  });
});
