import { Module } from 'vuex'
import { StateInterface } from './index'
import _ from 'lodash'

//* -----------------------------------------------------------
//  FLAG DESIGN IMPORTS ---------------------------------------
import inclusiveTriangle from '../assets/inclusive-triangle.svg'
import demiTriangle from '../assets/demi-triangle.svg'
import sapphicFlower from '../assets/sapphic-flower.svg'

//* -----------------------------------------------------------
//  MODULE STATE INTERFACE ------------------------------------
export type FlagElement = {
  col?: string;
  size?: string;
  img?: string;
  style?: Record<string, string>;
}
export type Flag = {
  name: string;
  tags: string[];
  type: 'general' | 'gender' | 'sexuality' | 'romantic';
  elements: (string|FlagElement)[];
}
export interface FlagsStateInterface {
  list: Flag[];
}

//* -----------------------------------------------------------
//  MODULE STATE DATA -----------------------------------------
const ModuleFlags: Module<FlagsStateInterface, StateInterface> = {
  namespaced: true,

  state (): FlagsStateInterface {
    return {
      list: [
        {
          name: 'Progress',
          tags: ['pride', 'inclusive'],
          type: 'general',
          elements: [
            { img: inclusiveTriangle, style: { height: '100%' } },
            '#FD1D26', '#FD941D', '#FFFF01', '#09C000', '#00189C', '#700380'
          ]
        },
        {
          name: 'Bisexual',
          tags: ['bi'],
          type: 'sexuality',
          elements: [
            '#E51B85',
            { col: '#9947BC', size: '50%' },
            '#3D46C6'
          ]
        },
        {
          name: 'Pansexual',
          tags: ['pan'],
          type: 'sexuality',
          elements: ['#FE218B', '#FED700', '#21B0FE']
        },
        {
          name: 'Aromantic',
          tags: ['aro'],
          type: 'romantic',
          elements: ['#39A849', '#AAD27A', '#FFFFFD', '#ABADAC', '#050706']
        },
        {
          name: 'Asexual',
          tags: ['ace'],
          type: 'sexuality',
          elements: ['#211F20', '#A2A5A4', '#FFFFFF', '#8B2582']
        },
        {
          name: 'Agender',
          tags: ['agen'],
          type: 'gender',
          elements: ['#050706', '#BBBBBB', '#FFFFFF', '#BBD981', '#FFFFFF', '#BBBBBB', '#050706']
        },
        {
          name: 'Lesbian',
          tags: ['les'],
          type: 'sexuality',
          elements: ['#D62C00', '#EF7527', '#FF9857', '#FFFFFF', '#D161A7', '#B65591', '#A60261']
        },
        {
          name: 'Sapphic',
          tags: ['sapphic'],
          type: 'sexuality',
          elements: [
            { img: sapphicFlower, style: { height: '35%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } },
            '#FE8CA9', '#FCF3FF', '#FE8CA9'
          ]
        },
        {
          name: 'Polysexual',
          tags: ['polysex'],
          type: 'sexuality',
          elements: ['#D50E8D', '#5ABD74', '#068DCF']
        },
        {
          name: 'Demisexual',
          tags: ['demisex'],
          type: 'sexuality',
          elements: [
            { img: demiTriangle, style: { height: '100%' } },
            '#FEFEFE',
            { col: '#68266D', size: '30%' },
            '#D2D2D2'
          ]
        },
        {
          name: 'Demiromantic',
          tags: ['demirom'],
          type: 'romantic',
          elements: [
            { img: demiTriangle, style: { height: '100%' } },
            '#FEFEFE',
            { col: '#379736', size: '30%' },
            '#D2D2D2'
          ]
        },
        {
          name: 'Gay Male',
          tags: ['gay', 'kyle'],
          type: 'sexuality',
          elements: ['#0A7866', '#419FA1', '#58C2CB', '#E9E8F7', '#77A8DB', '#147FC6', '#08316D']
        },
        {
          name: 'Transgender',
          tags: ['trans'],
          type: 'gender',
          elements: ['#5FC7EF', '#EDA3B4', '#FFFFFF', '#EDA3B4', '#5FC7EF']
        },
        {
          name: 'Transfem',
          tags: ['transfem'],
          type: 'gender',
          elements: ['#74DFFF', '#FEE1ED', '#FFB5D7', '#FE8DC0', '#FFB5D7', '#FEE1ED', '#74DFFF']
        },
        {
          name: 'Transmasc',
          tags: ['transmasc'],
          type: 'gender',
          elements: ['#F786B8', '#C7EDF5', '#96E4F6', '#70D8F7', '#96E4F6', '#C7EDF5', '#F786B8']
        },
        {
          name: 'Nonbinary',
          tags: ['enby', 'nb', 'non-binary'],
          type: 'gender',
          elements: ['#F6EC31', '#F7F7F7', '#9556C9', '#000000']
        },
        {
          name: 'Demigender',
          tags: [''],
          type: 'gender',
          elements: ['#7F7F7F', '#C7C1C3', '#FBFF76', '#FEFFFF', '#FBFF76', '#C7C1C3', '#7F7F7F']
        },
        {
          name: 'Demigirl',
          tags: [''],
          type: 'gender',
          elements: ['#7F7F7F', '#C7C1C3', '#FEB0CA', '#FEFFFF', '#FEB0CA', '#C7C1C3', '#7F7F7F']
        },
        {
          name: 'Demiboy',
          tags: [''],
          type: 'gender',
          elements: ['#7F7F7F', '#C7C1C3', '#9ED8E6', '#FEFFFF', '#9ED8E6', '#C7C1C3', '#7F7F7F']
        },
        {
          name: 'Genderfaun',
          tags: ['faun'],
          type: 'gender',
          elements: ['#F5BF86', '#F7E899', '#F2F1C7', '#F7F7F7', '#8AD8D2', '#89A8D7', '#937DE4']
        },
        {
          name: 'Genderfaunet',
          tags: ['faunet'],
          type: 'gender',
          elements: ['#FAA689', '#F5CF9F', '#F9FACC', '#FFFFFF', '#8CE0D8', '#89B0D9', '#9784EA']
        },
        {
          name: 'Genderfae',
          tags: ['fae'],
          type: 'gender',
          elements: ['#9BC19F', '#C1DEAE', '#F9FACE', '#FFFFFF', '#FDA1C5', '#DB89E4', '#AB7FDF']
        },
        {
          name: 'Genderfaer',
          tags: ['faer'],
          type: 'gender',
          elements: ['#54C2BD', '#AEDEB2', '#F9FACC', '#FFFFFF', '#FCA2C5', '#DB8AE3', '#AB7EDD']
        },
        {
          name: 'Genderflor',
          tags: ['flor'],
          type: 'gender',
          elements: ['#95C3A4', '#C2DEAE', '#F9FACE', '#FFFFFF', '#FBF9CC', '#FFF09D', '#FCC688']
        },
        {
          name: 'Genderfloren',
          tags: ['floren'],
          type: 'gender',
          elements: ['#54C2BD', '#AEDEB2', '#F9FACE', '#FFFFFF', '#F9FACE', '#F3D09F', '#FBA78A']
        },
        {
          name: 'Genderflorer',
          tags: ['florer'],
          type: 'gender',
          elements: ['#54C2BD', '#AEDEB2', '#E1ECC2', '#FFFFFF', '#FBF9CC', '#FFF09D', '#FAC789']
        },
        {
          name: 'Genderfloret',
          tags: ['floret'],
          type: 'gender',
          elements: ['#95C3A4', '#C2DEAE', '#F9F9D0', '#FFFFFF', '#FBEFCA', '#F3D09F', '#FBA78A']
        },
        {
          name: 'Libragender',
          tags: ['libra'],
          type: 'gender',
          elements: ['#000000', '#A3A3A3', '#FEFFFB', 'linear-gradient(90deg, #67BCBE, #AD648B)', '#FEFFFB', '#A3A3A3', '#000000']
        },
        {
          name: 'Greysexual',
          tags: [],
          type: 'sexuality',
          elements: ['#760095', '#AEA4AD', '#F6EFF7', '#AEA4AD', '#760095']
        },
        {
          name: 'Greyromantic',
          tags: [],
          type: 'romantic',
          elements: ['#087D13', '#AEA4AD', '#F6EFF7', '#AEA4AD', '#087D13']
        }
      ]
    }
  },

  getters: {
    //* Get Flag by Name/Tags
    getFlag: (state) => (name: string) => {
      return state.list.find((flag: Flag) => {
        return _.lowerCase(flag.name) === _.lowerCase(name) || flag.tags.includes(_.lowerCase(name))
      })
    }
  }
}

export default ModuleFlags
