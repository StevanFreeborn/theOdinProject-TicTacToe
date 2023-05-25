import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { add } from '../src/index';

describe('index', function () {
  it('should add two numbers', function () {
    const result = add(1, 4);
    expect(result).to.equal(5);
  });

  it('should have proper heading', function () {
    const { document } = new JSDOM(
      `<!DOCTYPE html><h1 id="heading">Hello World</h1>`
    ).window;
    expect(document.querySelector('#heading')?.textContent).to.equal(
      'Hello World'
    );
  });
});
