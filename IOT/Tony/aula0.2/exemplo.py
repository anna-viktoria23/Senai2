from machine import Pin, ADC, PWM
from utime import sleep

led = Pin(16, Pin.OUT)

while True:
    led.toggle()      
    sleep(1)
    
    
    
    