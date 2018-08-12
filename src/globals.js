import React from 'react';

export const pack = {
   options: {
      validate: {
         required: value => value ? '' : '필수 입력값입니다',
         number: value => value && isNaN(Number(value)) ? '숫자가 아닙니다' : '',
         email: value =>
               value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? '올바른 주소가 아닙니다' : ''
      }
   }
};
